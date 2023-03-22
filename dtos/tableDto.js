const create = (reqBody) => {
  const { numOfPeople, stage, image1, image2, image3, image4, options } =
    reqBody;
  return { numOfPeople, stage, image1, image2, image3, image4, options };
};

const update = (reqBody) => {
  const { _id, numOfPeople, stage, image1, image2, image3, image4, options } =
    reqBody;
  return { _id, numOfPeople, stage, image1, image2, image3, image4, options };
};

export default { create, update };
