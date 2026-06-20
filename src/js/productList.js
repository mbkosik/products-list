import { state } from './state';
import { appendApp, createElement, getFilterFromUrl, getPageFromUrl } from './utils';
import { getPagedItems, getTotalPages, renderPagination } from './pagination';

const createDetailEntry = (term, description) => {
  const termElement = createElement('dt', term);
  termElement.classList.add('list__term');
  const descriptionElement = createElement('dd', description);
  descriptionElement.classList.add('list__desc');

  return [termElement, descriptionElement];
};

const renderItem = (item) => {
  const itemElement = document.createElement('li');
  itemElement.classList.add('list__item');

  const idElement = createElement('p', item.id);
  idElement.classList.add('list__item-id');

  const nameElement = createElement('h2', item.name);
  nameElement.classList.add('list__item-name');

  const detailsElement = document.createElement('dl');
  detailsElement.classList.add('list__details');

  detailsElement.append(
    ...createDetailEntry('Cena', item.price),
    ...createDetailEntry('Kategoria', item.category)
  );

  itemElement.append(idElement, nameElement, detailsElement);

  return itemElement;
};

export const filterAndRender = () => {
  const data = state.products;

  const category = getFilterFromUrl('category');
  const minPrice = getFilterFromUrl('minPrice');
  const maxPrice = getFilterFromUrl('maxPrice');

  const filteredItems = data.filter(
    (product) =>
      (!category || product.category === category) &&
      (!minPrice || parseFloat(product.price) >= parseFloat(minPrice)) &&
      (!maxPrice || parseFloat(product.price) <= parseFloat(maxPrice))
  );

  const totalPages = getTotalPages(filteredItems.length);
  const currentPage = Math.min(getPageFromUrl(), Math.max(1, totalPages));
  const pagedItems = getPagedItems(filteredItems, currentPage);

  renderList(pagedItems);
  renderPagination(filteredItems.length, currentPage);
};

export const renderList = (data) => {
  const currentList = document.querySelector('.list');
  currentList?.remove();

  const productsList = document.createElement('ul');
  productsList.classList.add('list');
  data.forEach((item) => productsList.appendChild(renderItem(item)));

  appendApp(productsList);
};
