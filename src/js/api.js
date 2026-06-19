export const fetchData = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Status odpowiedzi: ${response.status}`);
  }

  return response.json();
};
