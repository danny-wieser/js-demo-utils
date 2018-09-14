export const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const parseFieldValue = value => (isJsonString(value) ? JSON.parse(value) : value);
export const fieldValueForDisplay = value => (typeof (value) === 'object' ? JSON.stringify(value) : value);
