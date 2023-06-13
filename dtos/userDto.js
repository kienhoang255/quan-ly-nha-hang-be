export const createUserDto = (reqBody) => {
  const { email, password, username, role, job, verification } = reqBody;
  return { email, password, username, role, job, verification };
};

export const loginUserDto = (reqBody) => {
  const { email, password } = reqBody;
  return { email, password };
};

export const changePassword = (reqBody) => {
  const { _id, password } = reqBody;
  return { _id, password };
};
