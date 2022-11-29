import {
  createFoodOrderedService,
  updateFoodOrderedStatusService,
} from "../services/foodOrderedService.js";
import { findOneFoodService } from "../services/foodService.js";
import { findOneTableService } from "../services/tableService.js";

export const createFoodOrderedController = async (data) => {
  const { id_table, id_bill, id_food, quantity } = data;
  const { price } = await findOneFoodService({ _id: data.id_food });
  return await createFoodOrderedService({
    id_table,
    id_bill,
    id_food,
    quantity,
    price,
  });
};

export const updateServedFoodOrderedController = async (data) => {
  let result;
  const { id_table, id_food } = await updateFoodOrderedStatusService(
    data,
    "served"
  );
  const { name: nameTable } = await findOneTableService({ id_table });
  const { name: nameFood } = await findOneFoodService({ _id: id_food });
  result = {
    nameTable,
    nameFood,
  };
  return result;
};

export const updateCancelFoodOrderedController = async (data) => {
  return await updateFoodOrderedStatusService(data, "cancel");
};

export const updateCancelAdminFoodOrderedController = async (data) => {
  return await updateFoodOrderedStatusService(data, "cancel");
};
