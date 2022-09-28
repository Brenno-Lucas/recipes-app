const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export async function fetchDrinks() {
  const ENDPOINT = 'search.php';
  const ENDPOINT_PARAMS = 's=';
  const URL = `${BASE_URL}/${ENDPOINT}?${ENDPOINT_PARAMS}`;

  const response = await fetch(URL);
  const { drinks } = await response.json();

  return drinks;
}

export async function fetchDrinksByType(param1, param2) {
  const URL = `${BASE_URL}/${param1}${param2}`;

  const response = await fetch(URL);
  const { drinks } = await response.json();

  return drinks;
}
