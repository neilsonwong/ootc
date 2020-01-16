export class UserAuthContext {
    username: string;
    // authdata: string;
    token: string;
    securityClearance: number;
    fname: string;
    expiry: number;

    constructor(username: string, token: string, securityClearance: number, fname: string, expiry: number) {
        this.username = username;
        this.fname = fname;
        // this.authdata = window.btoa(username + ':' + password);
        this.token = token;
        this.securityClearance = securityClearance;
        this.expiry = expiry;
    }
}
