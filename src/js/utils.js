export const createElement = (tag, text) => {
  const element = document.createElement(tag);
  element.textContent = text;

  return element;
};

export const createLabel = (id, value) => {
  const label = createElement('label', value);
  label.setAttribute('for', id);

  return label;
};

export const createInput = (type, id, label) => {
  const inputContainer = document.createElement('div');
  const input = document.createElement('input');
  input.setAttribute('type', type);
  input.id = id;

  const inputLabel = createLabel(id, label);

  inputContainer.append(inputLabel, input);

  return inputContainer;
};

export const updateParam = (key, value) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  if (key !== 'page') url.searchParams.delete('page');
  window.history.replaceState({}, '', url);
  window.dispatchEvent(new CustomEvent('paramChanged'));
};

export const getFilterFromUrl = (paramKey) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(paramKey);
};

export const getPageFromUrl = () => {
  const page = parseInt(getFilterFromUrl('page'), 10);
  return page >= 1 ? page : 1;
};

export const appendApp = (element) => {
  const app = document.querySelector('#app');

  if (!app) throw new Error('Brak kontenera aplikacji w strukturze HTML');

  app.append(element);
};
