const create = (reqBody) => {
  const { email, id_table } = reqBody;
  return { email, id_table };
};

const get = (reqBody) => {
  const { id_bill } = reqBody;
  return { id_bill };
};

const addFoodToBill = (reqBody) => {};

const changeTable = (reqBody) => {
  const { id_table, id_bill, id_table_to } = reqBody;
  return { id_table, id_bill, id_table_to };
};

export default { create, get, addFoodToBill, changeTable };
