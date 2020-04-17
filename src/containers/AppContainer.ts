import { useState, useCallback, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { createContainer } from 'unstated-next';
import { Support } from '../typings';
import { RouteProps } from '../pages/Top';
import SupportList from '../../data/supports.json';

export type AppContainerType = {
  word?: string | null;
  target?: string | null;
  category?: string | null;
  handleSetWord: (w?: string) => void;
  handleSetTarget: (w?: string) => void;
  handleSetCategory: (w?: string) => void;
  filteredSupports: Support[] | null;
};

const useAppContainer = (): AppContainerType => {
  const [word, setWord] = useState(null); // 単語
  const [target, setTarget] = useState(null); // 対象者チェックボックス
  const [category, setCategory] = useState(null); // カテゴリ
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
    const supports = SupportList;
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
    filteredSupports,
    target,
    category,
    handleSetWord,
    handleSetTarget,
    handleSetCategory,
  };
};

export const AppContainer = createContainer(useAppContainer);
