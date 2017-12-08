import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams ,ModalController} from 'ionic-angular';
import { EditprofilePage } from '../editprofile/editprofile';
import { Shipping_addressPage } from '../shipping_address/shipping_address';
import { PaymentPage } from '../payment/payment';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { MyprofilePage } from '../myprofile/myprofile';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { GooglePlus } from '@ionic-native/google-plus';
import { GetstartedPage } from '../getstarted/getstarted';
/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(public navCtrl: NavController,
  public viewCtrl: ViewController,
   public navParams: NavParams,
      private googlePlus: GooglePlus,
      private fb: Facebook,
      private twitter:TwitterConnect) {
      
  }

   dismiss() {
         let data = { 'foo': 'bar' };
   this.viewCtrl.dismiss(data);
    }
 
Signout(){
    if(localStorage.getItem('simple')){
         localStorage.clear();
     this.navCtrl.push(GetstartedPage) 
    }else if(localStorage.getItem('facebook')){
         this.fb.logout().then((sucess) => {
     // alert("gydsaty");
      localStorage.clear();
     // alert(sucess)
      this.navCtrl.push(GetstartedPage)
    }).catch((error) => {
     // alert(error);
       console.log(error)
    })
    } else if(localStorage.getItem('twitter')){
      this.twitter.logout().then((response) => {
       // alert("twsucclOG -> " + JSON.stringify(response))
        localStorage.clear();
         this.navCtrl.push(GetstartedPage);
      }).catch((error) => {
         localStorage.clear();
         this.navCtrl.push(GetstartedPage);
      //  alert("twError -> " + JSON.stringify(error))
      })
    }else if(localStorage.getItem('google')){
         this.googlePlus.logout().then((response)=> {
              
              localStorage.clear();
              this.navCtrl.push(GetstartedPage);
            }).catch((error) => {
         localStorage.clear();
         this.navCtrl.push(GetstartedPage);
      //  alert("twError -> " + JSON.stringify(error))
      })
            
    }
    else{
        this.navCtrl.push(GetstartedPage);
    }
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  openeditprofilepage(){
	  this.navCtrl.push(EditprofilePage)
  }
  open_shippingpage(){
	  this.navCtrl.push(Shipping_addressPage)
  }
  openpayment_page(){
	  this.navCtrl.push(PaymentPage)
  }

}
