import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, AlertController, LoadingController} from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgForm } from '@angular/forms';
import firebase from 'firebase';
import { PaymentsuccessfulPage } from '../paymentsuccessful/paymentsuccessful';

@Component({
  selector: 'page-pay_or_send',
  templateUrl: 'pay_or_send.html'
})
export class Pay_or_sendPage implements OnInit {

  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController,
    private barcodeScanner: BarcodeScanner,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {

  }
   
  ngOnInit() {
    
  }

  onScan(form: NgForm) {
    this.barcodeScanner.scan().then(barcodeData => {
      if(barcodeData){
        const loading = this.loadingCtrl.create({
          content: 'Waiting for customer confirmation'
        });
  
        loading.present();
  
  
        const paymentId = barcodeData.text;
        const paymentRef = firebase.database().ref('payments/' + paymentId);
        paymentRef.on('value', snapshot => {
          const paymentData = snapshot.val();
  
          if(paymentData){
  
            if(paymentData.status == 0){
              //customer QR code read, send confirmation request to customer
              paymentRef.set({
    
                amount: form.value.amount,
                createdAt: paymentData.createdAt,
                customerId: paymentData.customerId,
                status: 1
              }, error => {
                if(error) {
                  console.log(`error updating payment record: ${error}`);
                } else {
                  console.log('Payment status changed to 1');
                }
              });
  
            }
            else if(paymentData.status == 2) {
              //customer accepted the payment request
              paymentRef.off();
              loading.dismiss();
  
              paymentRef.set({
    
                amount: form.value.amount,
                createdAt: paymentData.createdAt,
                customerId: paymentData.customerId,
                status: 4
              }, error => {
                
                if(error) {
                  console.log(`error updating payment record: ${error}`);
                } else {
                  console.log('Payment status changed to 4');
                  this.navCtrl.push(PaymentsuccessfulPage);
                }
              });
            }
            else if(paymentData.status == 3) {
              //customer rejected the payment request
              paymentRef.off();
              loading.dismiss();
  
              const alertRejected = this.alertCtrl.create({
                title: 'Payment Cancelled',
                message: 'Customer has cancelled the payment',
                buttons: [{
                  text: 'Ok',
                  role: 'cancel',
                  handler: () => {
                    this.navCtrl.pop();
                  }
                }]
              });
  
              alertRejected.present();
            }
            
  
          } else {
            console.log('Payment Id not found');
            paymentRef.off();
            loading.dismiss();
            
            const alertNotFound = this.alertCtrl.create({
              title: 'Payment request not found',
              message: 'This is an invalid QR code',
              buttons: [{
                text: 'Ok',
                role: 'cancel',
                handler: () => {
                  this.navCtrl.pop();
                }
              }]
            });
  
            alertNotFound.present();
          }
  
        });
      }

 

     }).catch(err => {
         console.log('Error reading barcode ', err);
     });
  }

dismiss() {
		this.viewCtrl.dismiss();
	}

}
