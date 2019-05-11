import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { VerificationPage } from '../verification/verification';

import { TabsPage } from '../tabs/tabs';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { MerchantService } from '../../services/merchant';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private merchantService: MerchantService
  ) {

  }

  onSignup(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();

    this.authService.signup(form.value.email, form.value.password)
      .then((data) => {
        
        const token = data.user['ra'];

        this.merchantService.merchant = {
          fullname: form.value.fullname,
          email: form.value.email,
          phone: form.value.phone,
          account_no: form.value.account_no,
          retailer_id: form.value.retailer_id,
          createdAt: new Date().getTime()
        }

        this.merchantService.createMerchant(token).subscribe(
          (res) => {
            console.log(res);
          },
          (error) => console.log(error) 
        )
        loading.dismiss();

      })
      .catch((error) => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signup failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      })
  }

}
