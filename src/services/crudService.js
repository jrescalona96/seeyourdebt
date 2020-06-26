export const getData = () => {
  const localData = localStorage.getItem("data");
  const data = JSON.parse(localData);
  return data;
};

export const setData = async (fieldName, updatedData) => {
  let data = getData();
  if (fieldName !== "data") data[fieldName] = updatedData;
  else data = updatedData;
  localStorage.setItem("data", JSON.stringify(data));
};

export default { getData, setData };
