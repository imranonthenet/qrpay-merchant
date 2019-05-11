import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth";
import { environment } from "../environments/environment";


export interface Merchant {
    createdAt: number;
    fullname: string;
    email: string;
    phone: string;
    account_no: string;
    retailer_id: string;
}

@Injectable()
export class MerchantService {
    merchant: Merchant;

    constructor(
        private http: HttpClient,
        private authService: AuthService) {
    }

    createMerchant(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.post(environment.firebase.databaseURL + '/merchants/' + userId + '.json?auth=' + token, this.merchant);
    }

    getMerchant(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.get(environment.firebase.databaseURL + '/merchants/' + userId + '.json?auth=' + token);
    }
}