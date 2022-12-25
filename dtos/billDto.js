const create = (reqBody) => {
  const { email, id_table } = reqBody;
  return { email, id_table };
};

const get = (reqBody) => {
  const { id_bill } = reqBody;
  return { id_bill };
};

const addFoodToBill = (reqBody) => {};

export default { create, get, addFoodToBill };
