import { state } from './state';
import { appendApp, createElement, createModal, getFilterFromUrl, getPageFromUrl } from './utils';
import { getPagedItems, getTotalPages, renderPagination } from './pagination';

const priceFormatter = new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' });

const createDetailEntry = (term, description) => {
  const termElement = createElement('dt', term);
  termElement.classList.add('detail__term');
  const descriptionElement = createElement('dd', description);
  descriptionElement.classList.add('detail__desc');

  return [termElement, descriptionElement];
};

const renderProductModal = (id) => {
  if (!id) return;
  const currentProduct = state.products.find((product) => product.id === id);
  if (!currentProduct) return;

  const { modal, content } = createModal();

  const titleId = `modal-title-${currentProduct.id}`;
  modal.setAttribute('aria-labelledby', titleId);

  const header = document.createElement('header');
  header.classList.add('modal__header');

  const title = createElement('h2', currentProduct.name);
  title.id = titleId;
  title.classList.add('modal__title');

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.classList.add('modal__close');
  closeBtn.setAttribute('aria-label', 'Zamknij');
  closeBtn.textContent = '×';
  closeBtn.addEventListener('click', () => modal.close());

  header.append(title, closeBtn);

  const body = document.createElement('div');
  body.classList.add('modal__body');

  const description = createElement('p', currentProduct.description);
  description.classList.add('modal__description');

  const details = document.createElement('dl');
  details.classList.add('modal__details');

  const priceFormatted = priceFormatter.format(currentProduct.price);

  const [stockTerm, stockDesc] = createDetailEntry(
    'Dostępność',
    currentProduct.stock ? 'Dostępny' : 'Niedostępny'
  );
  stockDesc.dataset.stock = currentProduct.stock;

  details.append(
    ...createDetailEntry('Cena', priceFormatted),
    ...createDetailEntry('Kategoria', currentProduct.category),
    stockTerm,
    stockDesc
  );

  const tagsList = document.createElement('ul');
  tagsList.classList.add('modal__tags');
  tagsList.setAttribute('aria-label', 'Tagi produktu');

  currentProduct.tags.forEach((tag) => {
    const tagItem = document.createElement('li');
    tagItem.classList.add('modal__tag');
    tagItem.textContent = tag;
    tagsList.append(tagItem);
  });

  body.append(description, details, tagsList);
  content.append(header, body);

  modal.addEventListener('close', () => modal.remove());

  document.body.append(modal);
  modal.showModal();
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
    ...createDetailEntry('Cena', priceFormatter.format(item.price)),
    ...createDetailEntry('Kategoria', item.category)
  );

  itemElement.append(idElement, nameElement, detailsElement);

  itemElement.addEventListener('click', () => {
    renderProductModal(item.id);
  });

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
