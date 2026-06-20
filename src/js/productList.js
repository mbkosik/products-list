import { state } from './state';
import { appendApp, getFilterFromUrl } from './utils';
import { createElement } from './utils';

const createDetailEntry = (term, description) => {
  const termElement = createElement('dt', term);
  const descriptionElement = createElement('dd', description);

  return [termElement, descriptionElement];
};

const renderItem = (item) => {
  const itemElement = document.createElement('li');

  const idElement = createElement('p', item.id);
  const nameElement = createElement('h2', item.name);

  const detailsElement = document.createElement('dl');

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

  const filtered = data.filter(
    (product) =>
      (!category || product.category === category) &&
      (!minPrice || parseFloat(product.price) >= parseFloat(minPrice)) &&
      (!maxPrice || parseFloat(product.price) <= parseFloat(maxPrice))
  );

  renderList(filtered);
};

export const renderList = (data) => {
  const currentList = document.querySelector('.list');
  currentList?.remove();

  const productsList = document.createElement('ul');
  productsList.classList.add('list');
  data.forEach((item) => productsList.appendChild(renderItem(item)));

  appendApp(productsList);
};
