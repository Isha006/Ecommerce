import { Component } from '@angular/core';
import {NavController, ViewController ,LoadingController,AlertController,ToastController,ModalController} from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { CommonProvider } from '../../providers/common/common';
import { SharedProvider } from '../../providers/shared/shared';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ForgotPage } from '../forgot/forgot';
import { MyprofilePage } from '../myprofile/myprofile';
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  public data={
     email:"",
     password:"",
  };
  constructor(
      public navCtrl: NavController, 
      public viewCtrl: ViewController, 
      public modalCtrl: ModalController,
      public shared: SharedProvider,
      private http: Http, 
      public Cmn: CommonProvider,
      public loadingCtrl: LoadingController,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController) {

  }
    openSignupPage() {
    let modal = this.modalCtrl.create(SignupPage);
    modal.present();
  }
  
  
  
   forgot() {
    let modal = this.modalCtrl.create(ForgotPage);
    modal.present();
  }
   dismiss() {
   let data = { 'foo': 'bar' };
   this.viewCtrl.dismiss(data);
 }


sign_in(data){
    var url: string = this.shared.baseUrl + this.shared.SIGNIN;
    console.log(data.value);
      var post={
          email:data.value.email,
          password:data.value.password,
      }
       var serialized_data = this.Cmn.serializeObj(post);
    console.log(serialized_data);
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    var Loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      showBackdrop: false,
      cssClass: 'loader'
    });
    Loading.present().then(() => {
    this.http.post(url, serialized_data, options)
      .map(res => res.json())
      .subscribe(resolve => {
        console.log(resolve);
         Loading.dismiss();
         if(resolve.error==0){
        localStorage.setItem('userid', resolve.user.id);   
         localStorage.setItem('simple', resolve.user.id);   
        let toast = this.toastCtrl.create({
            message: resolve.message,
            duration: 3000,
            position: 'middle'
          });
           toast.present();
           this.navCtrl.push(MyprofilePage)
           
         }else{
               let toast = this.toastCtrl.create({
            message: resolve.message,
            duration: 3000,
            position: 'middle'
          });
           toast.present();
         }
      },error => {
       Loading.dismiss();
     // alert(JSON.stringify(error));
        let toast = this.toastCtrl.create({
            message: "Invalid Credentials",
            duration: 3000,
            position: 'middle'
          });
           toast.present();

    });
    });

    
}
}

//signin_form(signin){
//   
//this.Loading.present();
//
//var data={
//  email:signin.value.email,
//  password:signin.value.password,
//}
////alert(JSON.stringify(data))
//var Serialized = this.serializeObj(data);
//console.log(this.common.options);
//var optionss = this.common.options;
//this.http.post(this.common.base_url +'users/login', Serialized, optionss).map(res=>res.json()).subscribe(data=>{
//    console.log(data);
//    this.Loading.dismiss();
//   
//  },err => {
//       
//  })
//}
