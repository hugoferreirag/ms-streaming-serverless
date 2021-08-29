const { statusCode, messageResponse } = require("../../core/config/consts");

module.exports = class Response {
  constructor() {
    this.service;
  }

  successfullyCreated({ data }) {
    return {
      statusCode: statusCode.CREATED,
      data: JSON.stringify({
        data: data,
        message: messageResponse.CREATED,
      }),
    };
  }
  successfullyRead({ data }) {
    return {
      statusCode: statusCode.OK,
      data: JSON.stringify({
        data: data,
        message: messageResponse.READ_DATA,
      }),
    };
  }
  handleError({ error }) {
    if (
      typeof status == "number" &&
      Object.entries(statusCode).filter(([_, value]) => status == value)
    )
      return this.#internalServerError(error);

    switch (error) {
      case statusCode.ALREAD_EXISTS:
        return this.#alreadExists();

      case statusCode.NOT_FOUND:
        return this.#notFound();

      case statusCode.BAD_REQUEST:
        return this.#badRequest();

      case statusCode.UNAUTHORIZED:
        return this.#unauthorized();

      default:
        return this.#internalServerError(error);
    }
  }
  #internalServerError(error) {
    return {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({ message: error }),
    };
  }
  #alreadExists() {
    return {
      statusCode: statusCode.BAD_REQUEST,
      body: JSON.stringify({ message: messageResponse.ALREAD_EXISTS }),
    };
  }
  #notFound() {
    return {
      statusCode: statusCode.NOT_FOUND,
      body: JSON.stringify({ message: messageResponse.NOT_FOUND }),
    };
  }
  #badRequest() {
    return {
      statusCode: statusCode.BAD_REQUEST,
      body: JSON.stringify({ message: messageResponse.INVALID_DATA }),
    };
  }
  #unauthorized() {
    return {
      statusCode: statusCode.UNAUTHORIZED,
      body: JSON.stringify({ message: messageResponse.UNAUTHORIZED }),
    };
  }
};
