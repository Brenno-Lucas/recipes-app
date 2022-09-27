const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export async function fetchDrinks() {
  const ENDPOINT = 'search.php';
  const ENDPOINT_PARAMS = 's=';
  const URL = `${BASE_URL}/${ENDPOINT}?${ENDPOINT_PARAMS}`;

  const response = await fetch(URL);
  const { drinks } = await response.json();

  return drinks;
}

export async function fetchDrinksCategories() {
  const ENDPOINT = 'list.php';
  const ENDPOINT_PARAMS = 'c=list';
  const URL = `${BASE_URL}/${ENDPOINT}?${ENDPOINT_PARAMS}`;

  const response = await fetch(URL);
  const { drinks } = await response.json();

  return drinks;
}

export async function fetchDrinksByCategory(categoryName) {
  const ENDPOINT = 'filter.php';
  const ENDPOINT_PARAMS = `c=${categoryName}`;
  const URL = `${BASE_URL}/${ENDPOINT}?${ENDPOINT_PARAMS}`;

  const response = await fetch(URL);
  const { drinks } = await response.json();

  return drinks;
}

export const fetchDrinksById = async (drinkId) => {
  const ENDPOINT = 'lookup.php';
  const ENDPOINT_PARAMS = 'i=';
  const URL = `${BASE_URL}/${ENDPOINT}?${ENDPOINT_PARAMS}${drinkId}`;
  const response = await fetch(URL);
  const { drinks } = await response.json();

  return drinks[0];
};
