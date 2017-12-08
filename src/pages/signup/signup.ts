import { Component } from '@angular/core';
import { NavController, ViewController ,LoadingController,AlertController,ToastController} from 'ionic-angular';
import { Terms_conditionPage } from '../terms_condition/terms_condition';
import { Privacy_policyPage } from '../privacy_policy/privacy_policy';
import { MyprofilePage } from '../myprofile/myprofile';
import { CommonProvider } from '../../providers/common/common';
import { SharedProvider } from '../../providers/shared/shared';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { SigninPage } from '../signin/signin';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  public data={
    username:"",
     email:"",
     password:"",
     cpassword:"",
     fname:"",
     gender:"",

  };
  constructor(
      public navCtrl: NavController,
       public viewCtrl: ViewController,
       public shared: SharedProvider,
       private http: Http, 
       public Cmn: CommonProvider,
       public loadingCtrl: LoadingController,
       private alertCtrl: AlertController,
       private toastCtrl: ToastController
       
       ) {

  }

   dismiss() {
   let data = { 'foo': 'bar' };
   this.viewCtrl.dismiss(data);
 }
 openterms(){
	 this.navCtrl.push(Terms_conditionPage)
 }
 openprivacy(){
	 this.navCtrl.push(Privacy_policyPage)
 }
  
  openprofilepage(data){
      var url: string = this.shared.baseUrl + this.shared.SIGNUP;
      console.log(url);
      console.log(data.value);
      var post={
          full_name:data.value.fname,
          username:data.value.username,
          email:data.value.email,
          password:data.value.password,
          confirm_password:data.value.cpassword,
          gender:data.value.gender,
          role:"customer",
          image:"https://s3.us-east-2.amazonaws.com/ecoprofilephoto/profilepic/nophoto.jpg"
      }
    console.log(post);
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
              let toast = this.toastCtrl.create({
                message:resolve.message,
                duration: 4000,
                cssClass: 'toastCss',
                position: 'middle',
              });
              toast.present();
             this.navCtrl.push(SigninPage)
         }else{
               let toast = this.toastCtrl.create({
                message:resolve.message,
                duration: 4000,
                cssClass: 'toastCss',
                position: 'middle',
              });
              toast.present();
         }
      })
    })
  
	// this.navCtrl.push(MyprofilePage)
 }
 

}
