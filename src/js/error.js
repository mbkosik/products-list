import { appendApp, createElement } from './utils';

export const renderError = (message) => {
  const errorEl = document.createElement('div');
  errorEl.classList.add('error');
  errorEl.setAttribute('role', 'alert');

  const icon = createElement('span', '⚠');
  icon.setAttribute('aria-hidden', 'true');
  icon.classList.add('error__icon');

  const text = createElement('p', message);
  text.classList.add('error__message');

  errorEl.append(icon, text);
  appendApp(errorEl);
};
