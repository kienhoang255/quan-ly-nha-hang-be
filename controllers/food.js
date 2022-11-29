import {
  createFoodService,
  findFoodService,
  findOneFoodAndUpdateService,
} from "../services/foodService.js";

export const createFoodController = async (data) => {
  const createFood = await createFoodService(data);
  return createFood;
};

export const findFoodController = async () => {
  return await findFoodService();
};

export const findOneFoodAndUpdateController = async (data) => {
  const updateFood = await findOneFoodAndUpdateService(data._id, data);

  return updateFood;
};
