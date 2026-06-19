import { fetchData } from './js/api';
import { renderList } from './js/productList';

import './styles/main.scss';

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error('Zmienna API nie została zdefiniowana');
}

const main = async () => {
  try {
    const data = await fetchData(apiUrl);

    if (!Array.isArray(data)) throw new Error('Format danych jest niepoprawny');

    renderList(data);
  } catch (error) {
    // TODO: display message in interface
    console.error(error.message);
  }
};

main();
