const create = (reqBody) => {
  return {
    username: reqBody.username,
    password: reqBody.password,
    avatar: reqBody.avatar,
    email: reqBody.email,
    phone: reqBody.phone,
    role: reqBody.role,
    job: reqBody.job,
    address: reqBody.address,
  };
};
// const create = (reqBody) => {
//   let result;
//   if (reqBody.phone && reqBody.email) {
//     result = {
//       username: reqBody.username,
//       password: reqBody.password,
//       avatar: reqBody.avatar,
//       email: reqBody.email,
//       phone: reqBody.phone,
//       role: reqBody.role,
//       job: reqBody.job,
//       address: reqBody.address,
//     };
//   } else if (reqBody.phone) {
//     result = {
//       username: reqBody.username,
//       password: reqBody.password,
//       avatar: reqBody.avatar,
//       phone: reqBody.phone,
//       role: reqBody.role,
//       job: reqBody.job,
//       address: reqBody.address,
//     };
//   } else if (reqBody.email) {
//     result = {
//       username: reqBody.username,
//       password: reqBody.password,
//       avatar: reqBody.avatar,
//       email: reqBody.email,
//       role: reqBody.role,
//       job: reqBody.job,
//       address: reqBody.address,
//     };
//   }
//   return result;
// };

const update = (reqBody) => {
  return {
    username: reqBody.username,
    avatar: reqBody.avatar,
    email: reqBody.email,
    phone: reqBody.phone,
    role: reqBody.role,
    job: reqBody.job,
    address: reqBody.address,
  };
};

export default { create, update };
