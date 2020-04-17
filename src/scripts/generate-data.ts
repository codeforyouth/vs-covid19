import * as fs from 'fs';
import axios from 'axios';
import { getCSVSheetUrl, SHEET_KEY } from '../constants';
import { convertCSVToJSON } from '../utils';

const url = getCSVSheetUrl(SHEET_KEY);

const fetchData = async (): Promise<void> => {
  try {
    const { data } = await axios.get(url);
    fs.promises.writeFile('./data/supports.csv', data);
    const jsonData = convertCSVToJSON(data);
    fs.promises.writeFile('./data/supports.json', jsonData);
    return Promise.resolve();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.response?.text || 'error');
    return Promise.reject();
  }
};

fetchData();
