export class EmailValidationCredentials {
    userId: string;
    validationCode: number;

    constructor (userId: string, validationCode: number) {
        this.userId = userId;
        this.validationCode = validationCode;
    }
}