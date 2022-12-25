const create = (reqBody) => {
  const { name, price, type, image, description } = reqBody;
  return { name, price, type, image, description };
};

const update = (reqBody) => {
  const { _id, name, price, type, image, description } = reqBody;
  return { _id, name, price, type, image, description };
};

export default { create, update };
