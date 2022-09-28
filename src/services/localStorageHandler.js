export function saveItemInStorage(localStorageKey, localStorageData) {
  return localStorage.setItem(localStorageKey, JSON.stringify(localStorageData));
}

export function getItemFromStorage(localStorageKey) {
  return JSON.parse(localStorage.getItem(localStorageKey));
}
