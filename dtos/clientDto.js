export const createClientDto = (reqBody) => {
  const { username, email, phone, password, address } = reqBody;
  return { username, email, phone, password, address };
};

export const updateClientDto = (reqBody) => {
  const { username, email, phone, password, address } = reqBody;
  return { username, email, phone, password, address };
};

export const loginClientDto = (reqBody) => {
  const { email, password } = reqBody;
  return { email, password };
};
