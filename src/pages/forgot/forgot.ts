import { Component } from '@angular/core';
import { NavController, ViewController ,LoadingController,AlertController,ToastController,ModalController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { SharedProvider } from '../../providers/shared/shared';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html'
})
export class ForgotPage {
 public data={
     email:"" 
  };
  constructor( public navCtrl: NavController, 
      public viewCtrl: ViewController, 
      public modalCtrl: ModalController,
      public shared: SharedProvider,
      private http: Http, 
      public Cmn: CommonProvider,
      public loadingCtrl: LoadingController,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController) {

  }
forgot(data){
    console.log(data.value);
     var url: string = this.shared.baseUrl + this.shared.FORGOT;
    var post={
          email:data.value.email,
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
             
           let alert = this.alertCtrl.create({
        //  title: '<div style="text-align:center" class="ops">Oops</div>',
          message: '<div style="text-align:center" class="psswrd">'+resolve.message+'</div>',
          buttons: [
            {
              text: 'Dismiss',
              role: 'Dismiss',
              handler: () => {
                
                console.log('Cancel clicked');
              }
            },
            
          ]
        });
        alert.present();
        this.dismiss()
         }else{
         let toast = this.toastCtrl.create({
            message: resolve.message,
            duration: 3000,
            position: 'middle'
          });
           toast.present();
             this.dismiss();
         }
      },error => {
       Loading.dismiss();
       
     // alert(JSON.stringify(error));
        let toast = this.toastCtrl.create({
            message: "Invalid Email id",
            duration: 3000,
            position: 'middle'
          });
           toast.present();

    });
    });
}

 dismiss() {
		let data = { 'foo': 'bar' };
		this.viewCtrl.dismiss(data);
	}

}
