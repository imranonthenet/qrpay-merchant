import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import {SearchPage} from '../search/search';
import {Pay_or_sendPage} from '../pay_or_send/pay_or_send';
import {AddmoneyPage} from '../addmoney/addmoney';
import {GetpaymentPage} from '../getpayment/getpayment';
import {TransactionPage} from '../transaction/transaction';
import {PhonerechargePage} from '../phonerecharge/phonerecharge';
import {Book_ticketPage} from '../book_ticket/book_ticket';
import { Customer, CustomerService } from '../../services/customer';
import { AuthService } from '../../services/auth';
import { MerchantService, Merchant } from '../../services/merchant';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {
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

  search(){
        this.navCtrl.push(SearchPage)
  } 
  pay_or_send(){
        this.navCtrl.push(Pay_or_sendPage)
        
  } 
  addmoney(){
        this.navCtrl.push(AddmoneyPage)
  } 
  getpayment(){
        this.navCtrl.push(GetpaymentPage)
        
  } 
  transaction(){
        this.navCtrl.push(TransactionPage)
  } 
  phonerecharge(){
        this.navCtrl.push(PhonerechargePage)
  }  
  book_ticket(){
        this.navCtrl.push(Book_ticketPage)
  } 

}
