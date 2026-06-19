const createElement = (tag, text) => {
  const element = document.createElement(tag);
  element.textContent = text;

  return element;
};

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

export const renderList = (data) => {
  const app = document.querySelector('#app');

  if (!app) throw new Error('Brak kontenera aplikacji w strukturze HTML');

  const productsList = document.createElement('ul');
  productsList.classList.add('list');
  data.forEach((item) => productsList.appendChild(renderItem(item)));

  app.appendChild(productsList);
};
