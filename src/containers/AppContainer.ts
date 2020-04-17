import { useState, useCallback, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { createContainer } from 'unstated-next';
import { Support } from '../typings';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { RouteProps } from '../pages/Top';

export type AppContainerType = {
  word?: string | null;
  target?: string | null;
  category?: string | null;
  supportsData: SupportsData;
  handleSetWord: (w?: string) => void;
  handleSetTarget: (w?: string) => void;
  handleSetCategory: (w?: string) => void;
  handleSetSupports: (supports?: Support[] | null) => void;
  fetchSupports: (url: string) => void;
  filteredSupports: Support[] | null;
};

type SupportsData = {
  response: AxiosResponse<Support[]> | null;
  error: AxiosError | null;
  status?: 'loading' | 'success' | 'fail';
};

const initialSupportState: SupportsData = {
  response: null,
  error: null,
  status: undefined,
};

const useAppContainer = (): AppContainerType => {
  const [word, setWord] = useState(null); // 単語
  const [target, setTarget] = useState(null); // 対象者チェックボックス
  const [category, setCategory] = useState(null); // カテゴリ
  const [supportsData, setSupportsData] = useState<SupportsData>(
    initialSupportState,
  ); // 元となるデータ本体
  const [filteredSupports, setFilteredSupports] = useState<Support[] | null>(
    null,
  ); // 絞られた支援情報

  // setState用
  const handleSetWord = useCallback((w?: string): void => setWord(w), []);
  const handleSetTarget = useCallback((w?: string): void => setTarget(w), []);
  const handleSetCategory = useCallback(
    (w?: string): void => setCategory(w),
    [],
  );
  const handleSetSupports = useCallback((supports?: Support[] | null): void => {
    setSupportsData({
      ...supportsData,
      response: { ...supportsData.response, data: supports },
    });
  }, []);

  // 初期読込
  const fetchSupports = useCallback(async (url: string): Promise<void> => {
    setSupportsData({
      ...supportsData,
      status: 'loading',
    });
    try {
      const res: AxiosResponse<Support[] | null> = await axios.get(url);
      setSupportsData(prevState => ({
        ...prevState,
        response: res,
        status: 'success',
      }));
      return Promise.resolve();
    } catch (err) {
      setSupportsData(prevState => ({
        ...prevState,
        error: err,
        status: 'fail',
      }));
      return Promise.reject();
    }
  }, []);

  // 文字検索
  const filterByWord = useCallback((supports: Support[], word: string) => {
    const filteredByWordSupports = supports.filter(
      support =>
        support['サービス名称'].includes(word) ||
        support['詳細'].includes(word) ||
        support['企業等'].includes(word),
    );
    setFilteredSupports(filteredByWordSupports);
    return filteredByWordSupports;
  }, []);

  const filterByCategory = useCallback(
    (supports: Support[], category: string) => {
      const filteredByCategorySupports = supports.filter(support =>
        support['分野'].includes(category),
      );
      setFilteredSupports(filteredByCategorySupports);
      return filteredByCategorySupports;
    },
    [],
  );

  // 対象者検索
  const filterByTarget = useCallback((supports: Support[], target: string) => {
    const targetArray: string[] | string = target.split(',');
    const filteredByTargetSupports = supports.filter(support => {
      if (targetArray?.length > 1) {
        return (targetArray as string[])
          .map(t => support['対象者'].includes(t))
          .some(result => result);
      }
      return support['対象者'].includes(targetArray.toString());
    });
    setFilteredSupports(filteredByTargetSupports);
    return filteredByTargetSupports;
  }, []);

  // 絞り込み処理
  useEffect(() => {
    const supports = supportsData?.response?.data;
    if (!supports || (!word && !target && !category))
      return setFilteredSupports(null);
    if (word && !target && !category) {
      filterByWord(supports, word);
    }
    if (!word && target && !category) {
      filterByTarget(supports, target);
    }
    if (!word && !target && category) {
      filterByCategory(supports, category);
    }
    if (word && target && !category) {
      const wordSupports = filterByWord(supports, word);
      filterByTarget(wordSupports, target);
    }
    if (!word && target && category) {
      const targetSupports = filterByTarget(supports, target);
      filterByCategory(targetSupports, category);
    }
    if (word && target && category) {
      const wordSupports = filterByWord(supports, word);
      const targetSupports = filterByTarget(wordSupports, target);
      filterByCategory(targetSupports, category);
    }
    const paramsObj: RouteProps['matches'] = {
      q: word,
      targets: target,
      categories: category,
    };
    const queries = Object.entries(paramsObj)
      .filter(([_key, value]) => value != null)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');
    route(`/?${queries}`);
  }, [word, target, category]);

  return {
    word,
    supportsData,
    filteredSupports,
    target,
    category,
    handleSetWord,
    handleSetTarget,
    handleSetCategory,
    handleSetSupports,
    fetchSupports,
  };
};

export const AppContainer = createContainer(useAppContainer);
