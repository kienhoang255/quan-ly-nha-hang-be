const create = (reqBody) => {
  const { id_table, id_bill, foods } = reqBody;

  let result = [];
  foods.forEach((element) => {
    result.push({
      id_table,
      id_bill,
      id_food: element.id_food,
      price: element.price,
      quantity: element.quantity,
    });
  });

  return result;
};

const update = (reqBody) => {
  const { id_foodOrdered } = reqBody;
  return { id_foodOrdered };
};

const getFoodByBill = (reqBody) => {
  const { id_bill } = reqBody;
  return { id_bill };
};

export default { getFoodByBill, update, create };
