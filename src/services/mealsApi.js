export default async function fetchMeals() {
  const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
  const ENDPOINT = 'search.php';
  const ENDPOINT_PARAMS = 's=';
  const URL = `${BASE_URL}/${ENDPOINT}?${ENDPOINT_PARAMS}`;

  const response = await fetch(URL);
  const { meals } = await response.json();

  return meals;
}

export const fetchMealsById = async (mealId) => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const response = await fetch(`${URL}${mealId}`);
  const { meals } = await response.json();

  return meals[0];
};
