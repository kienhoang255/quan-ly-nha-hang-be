const create = (reqBody) => {
  const { numOfPeople, id_bill, status, stage, special } = reqBody;
  return { numOfPeople, id_bill, status, stage, special };
};

const update = (reqBody) => {
  const { numOfPeople, id_bill, _id, status, stage, special } = reqBody;
  return { numOfPeople, id_bill, _id, status, stage, special };
};

export default { create, update };
