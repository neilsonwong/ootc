export class UserAuthContext {
    username: string;
    authdata: string;
    securityClearance: number;

    constructor(username: string, password: string, securityClearance: number) {
        this.username = username;
        this.authdata = window.btoa(username + ':' + password);
        this.securityClearance = securityClearance;
    }
}
