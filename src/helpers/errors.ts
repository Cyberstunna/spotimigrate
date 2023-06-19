export class BadRequest extends Error {
    restStatusCode: number;

    constructor(message: string) {
        super();
        this.name = this.constructor.name;
        this.message = message;
        this.restStatusCode = 400;

        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
        this.stack = new Error(this.message).stack;
        }
    }
}

export class Unauthorized extends Error {
    restStatusCode: number;

    constructor(message: string) {
        super();
        this.name = this.constructor.name;
        this.message = message;
        this.restStatusCode = 401;

        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
        this.stack = new Error(this.message).stack;
        }
    }
}

export class InternalError extends Error {
    restStatusCode: number;

    constructor(message: string) {
        super();
        this.name = this.constructor.name;
        this.message = message;
        this.restStatusCode = 500;

        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
        this.stack = new Error(this.message).stack;
        }
    }
}