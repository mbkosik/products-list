import { appendApp, updateParam } from './utils';

const ITEMS_PER_PAGE = 9;

export const getTotalPages = (count) => {
  return Math.ceil(count / ITEMS_PER_PAGE);
};

export const getPagedItems = (items, currentPage) => {
  const from = (currentPage - 1) * ITEMS_PER_PAGE;
  const to = currentPage * ITEMS_PER_PAGE;

  return items.slice(from, to);
};

export const getPageRange = (currentPage, totalPages) => {
  // Zawsze pokazuj pierwszą i ostatnią stronę oraz sąsiadów aktualnej strony.
  // Set usuwa duplikaty (np. gdy currentPage === 1 lub totalPages === 2).
  // Filter odrzuca wartości spoza zakresu (np. currentPage - 1 < 1).
  const visible = new Set(
    [1, totalPages, currentPage - 1, currentPage, currentPage + 1].filter(
      (p) => p >= 1 && p <= totalPages
    )
  );

  const sorted = [...visible].sort((a, b) => a - b);

  // Przed każdym elementem z przerwą > 1 względem poprzedniego wstaw '...'.
  const result = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push('...');
    }
    result.push(sorted[i]);
  }

  return result;
};

export const renderPagination = (totalItems, currentPage) => {
  const totalPages = getTotalPages(totalItems);

  document.querySelector('.pagination')?.remove();

  if (totalPages <= 1) return;

  const paginationSection = document.createElement('section');
  paginationSection.classList.add('pagination');

  const backButton = document.createElement('button');
  backButton.classList.add('pagination__btn');
  backButton.textContent = 'Wstecz';
  backButton.disabled = currentPage === 1;
  backButton.addEventListener('click', () => updateParam('page', currentPage - 1));

  const pagesContainer = document.createElement('div');
  pagesContainer.classList.add('pagination__pages');

  getPageRange(currentPage, totalPages).forEach((item) => {
    if (item === '...') {
      const ellipsis = document.createElement('span');
      ellipsis.classList.add('pagination__ellipsis');
      ellipsis.textContent = '...';
      pagesContainer.append(ellipsis);
    } else {
      const pageButton = document.createElement('button');
      pageButton.classList.add('pagination__page');
      pageButton.textContent = item;
      if (item === currentPage) pageButton.classList.add('pagination__page--active');
      pageButton.addEventListener('click', () => updateParam('page', item));
      pagesContainer.append(pageButton);
    }
  });

  const nextButton = document.createElement('button');
  nextButton.classList.add('pagination__btn');
  nextButton.textContent = 'Następny';
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener('click', () => updateParam('page', currentPage + 1));

  paginationSection.append(backButton, pagesContainer, nextButton);
  appendApp(paginationSection);
};
