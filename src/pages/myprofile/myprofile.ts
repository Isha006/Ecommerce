import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams ,ModalController,LoadingController,AlertController,ToastController  } from 'ionic-angular';
import { SettingPage } from '../setting/setting';
import { CommonProvider } from '../../providers/common/common';
import { SharedProvider } from '../../providers/shared/shared';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html'
})
export class MyprofilePage {
user_id:any;
public userinfo = {
    name: "",
    username: "",
    gender: "",
    location:"",
    email:"",
    profilepicture:"",
  };
  constructor(public navCtrl: NavController, 
      public viewCtrl: ViewController, 
      public modalCtrl: ModalController,
      public shared: SharedProvider,
      private http: Http, 
      public Cmn: CommonProvider,
      public loadingCtrl: LoadingController,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,) {
          
      this.user_id = localStorage.getItem('userid');
      this.show_profile();
      

  }
  opensettingpage(){
	  this.navCtrl.push(SettingPage)
  }
   show_profile(){
    var url: string = this.shared.baseUrl + this.shared.SHOW_PROFILE;
  
      var post={
          id: this.user_id,
         
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
             this.userinfo.name = resolve.data.full_name;
             this.userinfo.gender = resolve.data.gender;
              this.userinfo.username = resolve.data.username;
              this.userinfo.location = resolve.data.location;
              this.userinfo.email = resolve.data.email;
              this.userinfo.profilepicture = resolve.data.image;
          }else{
//               let toast = this.toastCtrl.create({
//            message: resolve.message,
//            duration: 3000,
//            position: 'middle'
//          });
//           toast.present();
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
