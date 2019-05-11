import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { PaymentService } from '../../services/payment';

@Component({
  selector: 'page-getpayment',
  templateUrl: 'getpayment.html'
})
export class GetpaymentPage implements OnInit {
  qrcode = null;

  constructor(
    public navCtrl: NavController,
    private authService: AuthService,
    private paymentService: PaymentService) {

  }

  ngOnInit() {
    this.authService.getActiveUser().getIdToken()
      .then((token: string) => {
        this.paymentService.createPayment(token).subscribe(
          (res) => {
            this.qrcode = res['name'];
          },
          (error) => console.log(error) 
        )
      });
  }
}
