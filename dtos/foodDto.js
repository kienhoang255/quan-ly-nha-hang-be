export const createFoodDto = (reqBody) => {
  const { name, price, type, image, description } = reqBody;
  return { name, price, type, image, description };
};

export const updateFoodDto = (reqBody) => {
  const { _id, name, price, type, image, description } = reqBody;
  return { _id, name, price, type, image, description };
};
