export default async function fetchSearchBar(param1, param2) {
  const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';
  const URL = `${BASE_URL}/${param1}${param2}`;
  console.log(URL);

  const response = await fetch(URL);
  const meals = await response.json();
  console.log(meals);
  return meals;
}
