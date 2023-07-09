export class RequestResult {
    responseCode: number;
    success: boolean;
    message: string;

    constructor(responseCode = 500, success = false, message = "") {
        this.responseCode = responseCode;
        this.success = success;
        this.message = message;
    }
}
