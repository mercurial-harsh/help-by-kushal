function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
export const isEmptyObject = (objectToCheck) => {
  if (
    objectToCheck === null ||
    objectToCheck === undefined ||
    objectToCheck.length === 0
  )
    return true;
  if (Array.isArray(objectToCheck)) return !objectToCheck.length;
  if (typeof objectToCheck === "string") return !objectToCheck.trim().length;
  return Object.keys(objectToCheck).length === 0;
};

export default uuidv4;
