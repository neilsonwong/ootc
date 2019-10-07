export class EmailValidationCredentials {
    userId: string;
    validationCode: string;

    constructor (userId: string, validationCode: string) {
        this.userId = userId;
        this.validationCode = validationCode;
    }
}