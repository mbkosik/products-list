import { fetchData } from './js/api';
import { renderFilters } from './js/filters';
import { renderLoader } from './js/loader';
import { filterAndRender } from './js/products';
import { state } from './js/state';
import { renderError } from './js/error';

import './styles/main.scss';

const apiUrl = import.meta.env.VITE_API_URL;

const main = async () => {
  renderLoader();

  try {
    if (!apiUrl) throw new Error('Zmienna środowiskowa VITE_API_URL nie została zdefiniowana');

    const data = await fetchData(apiUrl);

    if (!Array.isArray(data)) throw new Error('Format danych jest niepoprawny');

    state.products = data;
    renderFilters();
    filterAndRender();

    window.addEventListener('popstate', filterAndRender);
    window.addEventListener('paramChanged', filterAndRender);
  } catch (error) {
    renderError(error.message);
  } finally {
    window.dispatchEvent(new CustomEvent('dataFetched'));
  }
};

main();
