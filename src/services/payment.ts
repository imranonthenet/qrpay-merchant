import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth";
import { environment } from "../environments/environment";

export interface Payment {
    customerId: string;
    createdAt: number;
}

@Injectable()
export class PaymentService {
    

    constructor(
        private http: HttpClient,
        private authService: AuthService) {
    }

    createPayment(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.post(environment.firebase.databaseURL + '/payment.json?auth=' + token, {customerId: userId, createdAt: new Date().getTime()});
    }

}