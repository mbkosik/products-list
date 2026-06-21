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

export const createModal = () => {
  const modal = document.createElement('dialog');
  modal.classList.add('modal');
  const content = document.createElement('div');

  modal.append(content);

  const getFocusable = () => [
    ...modal.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ),
  ];

  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    const focusable = getFocusable();
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });

  return { modal, content };
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
