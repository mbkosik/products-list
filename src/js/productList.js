const renderItem = (item) => {
  const itemElement = document.createElement('li');

  itemElement.textContent = item.name;

  return itemElement;
};

export const renderList = (data) => {
  const app = document.querySelector('#app');

  if (!app) throw new Error('Brak kontenera aplikacji w strukturze HTML');

  const listSection = document.createElement('section');
  listSection.classList.add('list');
  data.forEach((item) => listSection.appendChild(renderItem(item)));

  app.appendChild(listSection);
};
