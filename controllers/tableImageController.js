import tableImageService from "../services/tableImageService.js";
import tableService from "../services/tableService.js";

const findOne = async (data) => {
  return await tableImageService.findOne(data);
};

const find = async (data) => {
  let result = [];
  const tableImage = await tableImageService.find({ options: { $all: data } });
  for (const item of tableImage) {
    result.push(await tableService.findOne({ _id: item.id_table }));
  }
  return result;
};

const create = async (data) => {
  const { id_table, image1, image2, image3, image4, options } = data;
  return await tableImageService.create({
    id_table,
    image1,
    image2,
    image3,
    image4,
    options,
  });
};

const update = async (data) => {
  const { id_table, image1, image2, image3, image4, options } = data;
  return await tableImageService.findOneUpdate(
    { id_table },
    {
      image1,
      image2,
      image3,
      image4,
      options,
    }
  );
};

const findDistinct = async (option) => {
  return await tableImageService.findDistinct(option);
};

export default { create, update, find, findOne, findDistinct };
