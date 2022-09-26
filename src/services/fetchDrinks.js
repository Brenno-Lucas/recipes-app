export default async function fetchDrinks() {
  const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';
  const ENDPOINT = 'search.php';
  const ENDPOINT_PARAMS = 's=';
  const URL = `${BASE_URL}/${ENDPOINT}?${ENDPOINT_PARAMS}`;

  const response = await fetch(URL);
  const { drinks } = await response.json();

  return drinks;
}
