export const createFoodOrderedDto = (reqBody) => {
  const { id_table, id_bill, foods } = reqBody;

  let result = [];
  foods.forEach((element) => {
    result.push({
      id_table,
      id_bill,
      id_food: element.id_food,
      quantity: element.quantity,
    });
  });

  return result;
};

export const updateFoodOrderedDto = (reqBody) => {
  const { id_foodOrdered } = reqBody;
  return { id_foodOrdered };
};
