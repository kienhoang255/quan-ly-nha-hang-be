function HttpError(message, statusCode) {
  const error = new Error(message);
  error.code = statusCode;
  return error;
}

HttpError.prototype = Object.create(Error.prototype);

export default HttpError;
