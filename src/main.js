import { fetchData } from './js/api';
import { renderFilters } from './js/filters';
import { filterAndRender } from './js/productList';
import { state } from './js/state';

import './styles/main.scss';

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error('Zmienna API nie została zdefiniowana');
}

const main = async () => {
  try {
    const data = await fetchData(apiUrl);

    if (!Array.isArray(data)) throw new Error('Format danych jest niepoprawny');

    state.products = data;
    renderFilters();
    filterAndRender();

    window.addEventListener('popstate', filterAndRender);
    window.addEventListener('paramChanged', filterAndRender);
  } catch (error) {
    // TODO: display message in interface
    console.error(error.message);
  }
};

main();
