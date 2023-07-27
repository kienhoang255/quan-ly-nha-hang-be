const create = (reqBody) => {
  const { username, email, phone, password, address } = reqBody;
  return { username, email, phone, password, address, verification: "true" };
};

const update = (reqBody) => {
  const { username, email, phone, address, avatar, sex, birth, _id } = reqBody;
  return { username, email, phone, address, avatar, sex, birth, _id };
};

const login = (reqBody) => {
  const { email, password } = reqBody;
  return { email, password };
};

const find = (reqParams) => {
  const { _id } = reqParams;
  return _id;
};

export default { create, update, login, find };
