import { appendApp } from './utils';

export const renderLoader = () => {
  const loader = document.createElement('div');
  loader.classList.add('loader');
  loader.setAttribute('role', 'status');
  loader.setAttribute('aria-label', 'Ładowanie');
  appendApp(loader);

  window.addEventListener('dataFetched', () => loader.remove(), { once: true });
};
