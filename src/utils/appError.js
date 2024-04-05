// import { serverResponse } from "../controller/utilsController.js";

export const serverResponse = (res, status, message, data, other) => {
    return res.status(status).send({ statusCode: status, message, data, ...other });
};

export const notFoundController = (req, res) => {
    serverResponse(res, 404, "Page not found");
};


export class AppError extends Error {

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }

}


export const globalErrorHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    res.status(error.statusCode).send({
        status: error.status,
        statusCode: error.statusCode,
        message: error.message,
        stack: error.stack,
    });
    return;
};

