import { Component } from '@angular/core';
import {  NavController, ViewController ,NavParams,LoadingController,AlertController,ToastController,ModalController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { SharedProvider } from '../../providers/shared/shared';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SigninPage } from '../signin/signin';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html'
})
export class ChangepasswordPage {
    user_id:any;
    u_email:any;
 public data = {
    old: "",
    new: "",
    cpnew: ""

  };
  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public viewCtrl: ViewController, 
      public modalCtrl: ModalController,
      public shared: SharedProvider,
      private http: Http, 
      public Cmn: CommonProvider,
      public loadingCtrl: LoadingController,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,) {
      this.u_email = this.navParams.get('user_email');
      console.log(this.u_email);
this.user_id = localStorage.getItem('userid');
  }
 change_pass(data) {
    var url: string = this.shared.baseUrl + this.shared.CHANGE_PASSWORD;
    console.log(url)


      var poastdata = {
         id:this.user_id,
        email:this.u_email,
        password: data.value.old,
        new_password: data.value.new,
        confirm_password:data.value.cpnew,
       
      }
      console.log(poastdata);
      var serialized_data = this.Cmn.serializeObj(poastdata);
      //console.log(serialized_data);
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
          .subscribe((resolve) => {
            console.log(resolve)
            Loading.dismiss();
            if (resolve.error == 0) {
              let toast = this.toastCtrl.create({
                message: resolve.message,
                duration: 3000,
                cssClass: 'toastCss',
                position: 'middle',
              });
              toast.present();
              localStorage.clear();
              this.navCtrl.push(SigninPage) 
              // this.navCtrl.push(TabsPage);
            }
            else {
              let toast = this.toastCtrl.create({
                message: resolve.message,
                duration: 3000,
                cssClass: 'toastCss',
                position: 'middle',
              });
              toast.present();

            }
          })
      })
    
  }
}
