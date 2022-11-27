export const createBillDto = (reqBody) => {
  const { email, id_table } = reqBody;
  return { email, id_table };
};
