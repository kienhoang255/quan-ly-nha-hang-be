export const createTableDto = (reqBody) => {
  const { numOfPeople, id_bill, status, stage, special } = reqBody;
  return { numOfPeople, id_bill, status, stage, special };
};
