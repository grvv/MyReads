export function addToLocalStorage(keyName, data) {
  localStorage.setItem(keyName, JSON.stringify(data));
}

export function getValue(keyName) {
  const value = localStorage.getItem(keyName);
  let parsedValue;
  try {
    parsedValue = JSON.parse(value);
  } catch (error) {
    parsedValue = null;
  }

  return parsedValue;
}