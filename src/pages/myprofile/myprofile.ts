import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { MerchantService, Merchant } from '../../services/merchant';

@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html'
})
export class MyprofilePage implements OnInit {
  merchant: Merchant = {
    fullname:'',
    email:'',
    phone:'',
    account_no:'',
    retailer_id:'',
    createdAt: 0
  };

  constructor(public navCtrl: NavController,
    private authService: AuthService,
    private merchantService: MerchantService) {

  }

  ngOnInit() {
    this.authService.getActiveUser().getIdToken()
      .then((token: string) => {
        this.merchantService.getMerchant(token).subscribe(
          (res) => {
            this.merchant = res[Object.keys(res)[0]];
            
          },
          (error) => console.log(error) 
        )
      });
  }

}
