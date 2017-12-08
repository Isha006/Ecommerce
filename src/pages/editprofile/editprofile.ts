import { Component } from '@angular/core';
import { NavController, ViewController ,LoadingController,AlertController,ToastController,ModalController } from 'ionic-angular';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { Change_emailPage } from '../change_email/change_email';
import { MyprofilePage } from '../myprofile/myprofile';
import { CommonProvider } from '../../providers/common/common';
import { SharedProvider } from '../../providers/shared/shared';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html'
})
export class EditprofilePage {
user_id:any;
imgTosend:any;
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
      private toastCtrl: ToastController,
      private camera: Camera,
      public actionSheetCtrl: ActionSheetController
     ) {
this.user_id = localStorage.getItem('userid');
this.show_profile();
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
              if(resolve.data.location=="undefined"){
                  this.userinfo.location=""
              }else{
                  this.userinfo.location = resolve.data.location;
              }
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




 next_log(data){
    var url: string = this.shared.baseUrl + this.shared.EDIT_PROFILE;
    
    var postdata = {
      id: localStorage.getItem('userid'),
      full_name:data.value.name,
      username:data.value.username,
      gender:data.value.gender,
      location:data.value.location,
      image:this.userinfo.profilepicture,
      role:"custommer"
    }
    console.log(postdata);
    var serialized_data = this.Cmn.serializeObj(postdata);
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
        .subscribe((response) => {
          console.log(response)
                   Loading.dismiss();
//          if(response.isSuccess==true){
//            let toast = this.toastCtrl.create({
//              message: response.msg,
//              duration: 3000,
//              cssClass: 'toastCss',
//              position: 'middle',
//            });
//            toast.present();
//         // this.navCtrl.push(Modal_userPage);
//          }
//          else{
//            let toast = this.toastCtrl.create({
//              message: response.msg,
//              duration: 3000,
//              cssClass: 'toastCss',
//              position: 'middle',
//            });
//           toast.present();
//         }
        })
      })
  }
  
  
  
   public presentActionSheet() {

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  public takePicture(sourceType) {

    var options = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      this.imgTosend = imagePath;
      this.userinfo.profilepicture = 'data:image/jpeg;base64,' + imagePath
      this.uploadImage();
    }, (err) => {
      //this.presentToast('Error while selecting image.');
    });
  }
    uploadImage() {
    
    var url: string = this.shared.baseUrl + this.shared.IMAGE_CHANGE;
   
    var postdata = {
     
      profile_picture: this.imgTosend,
      user_id:this.user_id
    }
   
    var serialized_data = this.Cmn.serializeObj(postdata);
     var Loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      showBackdrop: false,
      cssClass: 'loader'
    });
    Loading.present().then(() => {
    
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, serialized_data, options)
      .map(res => res.json())
      .subscribe((response) => {
   Loading.dismiss();
      })
      
      })
  }
  openchangepasswordPage(email){
	  this.navCtrl.push(ChangepasswordPage,{
              user_email:email,
          })
  }
  openchangeemailPage(){
	  this.navCtrl.push(Change_emailPage)
  }
  openprofilePage(){
	  this.navCtrl.push(MyprofilePage)
  }

}
