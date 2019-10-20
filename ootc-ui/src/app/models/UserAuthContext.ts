export class UserAuthContext {
    username: string;
    authdata: string;
    securityClearance: number;
    fname: string;

    constructor(username: string, password: string, securityClearance: number, fname: string) {
        this.username = username;
        this.fname = fname;
        this.authdata = window.btoa(username + ':' + password);
        this.securityClearance = securityClearance;
    }
}
