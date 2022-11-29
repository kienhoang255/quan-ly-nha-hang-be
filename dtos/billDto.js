export const createBillDto = (reqBody) => {
  const { email, id_table } = reqBody;
  return { email, id_table };
};

export const getBillDto = (reqBody) => {
  const { id_bill } = reqBody;
  return { id_bill };
};

export const addFoodToBill = (reqBody) => {};
