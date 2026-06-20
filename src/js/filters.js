import { state } from './state';
import { appendApp, createInput, createLabel, getFilterFromUrl, updateParam } from './utils';

const createSelect = (options, name, label) => {
  const selectContainer = document.createElement('div');
  const select = document.createElement('select');

  select.id = name;
  select.name = name;

  const selectLabel = createLabel(name, label);

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Wszystkie';
  select.append(defaultOption);

  options.forEach((filter) => {
    const option = document.createElement('option');

    option.value = filter;
    option.textContent = filter;

    select.append(option);
  });

  selectContainer.append(selectLabel, select);

  return selectContainer;
};

const handleFilterEvents = (...elements) => {
  const inputs = elements.map((el) => el.querySelector('input, select'));

  inputs.forEach((inputChild) => {
    const filterParam = getFilterFromUrl(inputChild.id);
    inputChild.value = filterParam ?? '';
  });

  const minInput = inputs.find((el) => el?.id === 'minPrice');
  const maxInput = inputs.find((el) => el?.id === 'maxPrice');

  if (minInput && maxInput) {
    minInput.addEventListener('change', () => {
      const min = parseFloat(minInput.value);
      const max = parseFloat(maxInput.value);
      if (max && min >= max) minInput.value = max - 1;
      if (minInput.value) maxInput.min = parseFloat(minInput.value) + 1;
    });

    maxInput.addEventListener('change', () => {
      const min = parseFloat(minInput.value);
      const max = parseFloat(maxInput.value);
      if (min && max <= min) maxInput.value = min + 1;
      if (maxInput.value) minInput.max = parseFloat(maxInput.value) - 1;
    });
  }

  inputs.forEach((inputChild) => {
    if (inputChild instanceof HTMLInputElement || inputChild instanceof HTMLSelectElement) {
      inputChild.addEventListener('change', (e) => updateParam(e.target.id, e.target.value));
    }
  });
};

export const renderFilters = () => {
  const filters = new Set(state.products.map((product) => product.category));

  const section = document.createElement('section');
  section.classList.add('filters');

  // Select kategorii
  const filtersSelect = createSelect(filters, 'category', 'Wybierz kategorię: ');

  // Inputy cen
  const minPriceInput = createInput('number', 'minPrice', 'Ustaw cenę minimalną: ');
  const maxPriceInput = createInput('number', 'maxPrice', 'Ustaw cenę maksymalną: ');

  section.append(filtersSelect, minPriceInput, maxPriceInput);

  appendApp(section);
  handleFilterEvents(filtersSelect, minPriceInput, maxPriceInput);
};
