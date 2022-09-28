const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function fetchMeals() {
  const ENDPOINT = 'search.php';
  const ENDPOINT_PARAMS = 's=';
  const URL = `${BASE_URL}/${ENDPOINT}?${ENDPOINT_PARAMS}`;

  const response = await fetch(URL);
  const { meals } = await response.json();

  return meals;
}

export async function fetchMealsByType(param1, param2) {
  const URL = `${BASE_URL}/${param1}${param2}`;

  const response = await fetch(URL);
  const { meals } = await response.json();
  return meals;
}
