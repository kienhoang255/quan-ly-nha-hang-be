const create = (reqBody) => {
  const { name, price, type, image, description, status } = reqBody;
  return { name, price, type, image, description, status };
};

const update = (reqBody) => {
  const { _id, name, price, type, image, description, status } = reqBody;
  return { _id, name, price, type, image, description, status };
};

export default { create, update };
