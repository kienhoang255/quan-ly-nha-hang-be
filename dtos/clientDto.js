const create = (reqBody) => {
  const { username, email, phone, password, address } = reqBody;
  return { username, email, phone, password, address };
};

const update = (reqBody) => {
  const { username, email, phone, password, address } = reqBody;
  return { username, email, phone, password, address };
};

const login = (reqBody) => {
  const { email, password } = reqBody;
  return { email, password };
};

const find = (reqParams) => {
  const { id } = reqParams;
  return { id_client: id };
};

export default { create, update, login, find };
