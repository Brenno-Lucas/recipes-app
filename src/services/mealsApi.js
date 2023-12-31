const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function fetchMeals() {
  const ENDPOINT = 'search.php';
  const ENDPOINT_PARAMS = 's=';
  const URL = `${BASE_URL}/${ENDPOINT}?${ENDPOINT_PARAMS}`;

  const response = await fetch(URL);
  const { meals } = await response.json();

  return meals;
}

export async function fetchMealsCategories() {
  const ENDPOINT = 'list.php';
  const ENDPOINT_PARAMS = 'c=list';
  const URL = `${BASE_URL}/${ENDPOINT}?${ENDPOINT_PARAMS}`;

  const response = await fetch(URL);
  const { meals } = await response.json();

  return meals;
}

export async function fetchMealsByCategory(categoryName) {
  const ENDPOINT = 'filter.php';
  const ENDPOINT_PARAMS = `c=${categoryName}`;
  const URL = `${BASE_URL}/${ENDPOINT}?${ENDPOINT_PARAMS}`;

  const response = await fetch(URL);
  const { meals } = await response.json();

  return meals;
}

export const fetchMealsById = async (mealId) => {
  const ENDPOINT = 'lookup.php';
  const ENDPOINT_PARAMS = 'i=';
  const URL = `${BASE_URL}/${ENDPOINT}?${ENDPOINT_PARAMS}${mealId}`;
  const response = await fetch(URL);
  const { meals } = await response.json();

  return meals[0];
};

export async function fetchMealsByType(param1, param2) {
  const URL = `${BASE_URL}/${param1}${param2}`;

  const response = await fetch(URL);
  const { meals } = await response.json();
  return meals;
}
