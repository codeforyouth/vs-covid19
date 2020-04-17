import { Support } from '../typings';

// ref: https://github.com/codeforjapan/vs-covid19/blob/master/node/util.js

export const convertArrayToJson = (csv: string[][]): Support[] => {
  const res = [];
  const head = csv[0];
  for (let i = 1; i < csv.length; i++) {
    const d: Support | undefined | null = {};
    for (let j = 0; j < head.length; j++) {
      d[head[j] as keyof Support] = csv[i][j];
    }
    res.push(d);
  }
  return res;
};

export const convertCsvToArray = (s: string): string[][] => {
  const res = [];
  let st = 0;
  let line = [];
  let sb = null;
  if (!s.endsWith('\n')) s += '\n';
  const len = s.length;
  for (let i = 0; i < len; i++) {
    const c = s.charAt(i);
    if (c === '\r') continue;
    if (st === 0) {
      if (c === '\n') {
        if (line.length > 0) line.push('');
        res.push(line);
        line = [];
      } else if (c === ',') {
        line.push('');
      } else if (c === '"') {
        sb = '';
        st = 2;
      } else {
        sb = c;
        st = 1;
      }
    } else if (st === 1) {
      if (c === '\n') {
        line.push(sb);
        res.push(line);
        line = [];
        st = 0;
        sb = null;
      } else if (c === ',') {
        line.push(sb);
        sb = null;
        st = 0;
      } else {
        sb += c;
      }
    } else if (st === 2) {
      if (c === '"') {
        st = 3;
      } else {
        sb += c;
      }
    } else if (st === 3) {
      if (c === '"') {
        sb += c;
        st = 2;
      } else if (c === ',') {
        line.push(sb);
        sb = null;
        st = 0;
      } else if (c === '\n') {
        line.push(sb);
        res.push(line);
        line = [];
        st = 0;
        sb = null;
      }
    }
  }
  if (sb != null) line.push(sb);
  if (line.length > 0) res.push(line);
  return res;
};

export const convertCSVToJSON = (csv: string): string => {
  const array = convertCsvToArray(csv);
  const json = convertArrayToJson(array);
  const data = JSON.stringify(json);
  return data;
};
