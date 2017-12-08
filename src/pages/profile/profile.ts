import { Component } from '@angular/core';
import { NavController, ViewController ,LoadingController,AlertController,ToastController,ModalController} from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { SignupPage } from '../signup/signup';
import { CommonProvider } from '../../providers/common/common';
import { SharedProvider } from '../../providers/shared/shared';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { MyprofilePage } from '../myprofile/myprofile';
import { TwitterConnect } from '@ionic-native/twitter-connect';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
    
profilepicface:any;
loader: any;
  constructor(
       public navCtrl: NavController, 
      public viewCtrl: ViewController, 
      public modalCtrl: ModalController,
      public shared: SharedProvider,
      private http: Http, 
      public Cmn: CommonProvider,
      public loadingCtrl: LoadingController,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,
      private googlePlus: GooglePlus,
      private fb: Facebook,
      private twitter:TwitterConnect
      ) {

  }
  openSigninPage() {
    let modal = this.modalCtrl.create(SigninPage);
    modal.present();
  }
  presentModal() {
    let modal = this.modalCtrl.create(SignupPage);
    modal.present();
  }
  
  loginUser()
  {
       this.loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: 600
    });
    this.loader.present();
//      alert("i")
    
    this.googlePlus.login({
   'webClientId': '536338587449-failo2kq4ct9h388a04b4qagnu96veq6.apps.googleusercontent.com',
   'offline': true
    }).then(res => {
    console.log(res);
    
//      alert(JSON.stringify(res));
            
//    alert(JSON.stringify(res.givenName));
//    alert(JSON.stringify(res.idToken));
    
    var data_google = ({

        full_name: res.displayName,
        google_id: res.userId,
        image: res.imageUrl,
        email: res.email

      });
      var serialized_google = this.Cmn.serializeObj(data_google);
//            alert(JSON.stringify(serialized_google));

            let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' });
            let options = new RequestOptions({ headers: headers });
            var url: string = this.shared.baseUrl + 'api/users/googlelogin';

            this.http.post(url, serialized_google, options).map(res => res.json()).subscribe(datarestgoogle => {
//        this.loading.dismiss();
this.loader.dismiss();
//        alert('api');
//        alert(JSON.stringify(datarestgoogle));

        if (datarestgoogle.error == 0) {
            
          localStorage.setItem('userid', datarestgoogle.data._id);
          localStorage.setItem('google', datarestgoogle.data._id);

          let toast = this.toastCtrl.create({
            message: datarestgoogle.msg,
            duration: 3000
          });
          toast.present();

          this.navCtrl.push(MyprofilePage);
        } else {
          let toast = this.toastCtrl.create({
            message: datarestgoogle.msg,
            duration: 3000
          });
          toast.present();
//          this.googlePlus.logout()
//            .then(function (response) {
//              localStorage.removeItem("GOOGLEUSERID");
//              localStorage.clear();
//
//            })
        }
      })
    }, error => {
//      this.loading.dismiss();
      alert('error');
      alert(JSON.stringify(error));

    });
}
//, error => {
// console.log(JSON.stringify(error));
//      alert('error');
//      alert(JSON.stringify(error));
//
//    });
 
 
 
 /////////////////////facebook/////////////////////
 
 
 facebook_login() {
    // alert("facebook")
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
         //alert(JSON.stringify(res))
        this.fb.api('me/?fields=id,email,last_name,first_name', ["public_profile", "email"])
          .then((result) => {
              console.log(result);
              console.log(result.id);
           // alert(result.id);
            this.profilepicface = "https://graph.facebook.com/" + result.id + "/picture?type=large"
            console.log(this.profilepicface);
               var url: string = this.shared.baseUrl + this.shared.FACEBOOK;
             var signindata = {
              full_name: result.first_name,
              email: result.email,
              image:this.profilepicface,
              facebook_id:result.id
            }
            
            var serialized_data = this.Cmn.serializeObj(signindata);
            console.log(serialized_data)

            let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' });
            let options = new RequestOptions({ headers: headers });
            this.http.post(url, serialized_data, options)
              .map(res => res.json())
              .subscribe(resolve => {
                console.log(resolve);
                if(resolve.error==0){
                    localStorage.setItem('userid', resolve.data._id);  
                    localStorage.setItem('facebook', resolve.data._id);  
                     let toast = this.toastCtrl.create({
            message: resolve.message,
            duration: 3000,
            position: 'middle'
          });
           toast.present();
           this.navCtrl.push(MyprofilePage)
                }else{
                    
                }
              })
          
          }).catch(d => {
            alert(JSON.stringify(d))
          alert(JSON.stringify(d))
          })
        })
      .catch(e => {
       // alert("grover"+e)
      alert(JSON.stringify(e))
        
     
      });
      
        }
        
        ///////////twitter//////////
        public twitter_login(){
            //alert("twitter");
            this.twitter.login().then(onSuccess => {
         //alert('response');
        // alert(JSON.stringify(onSuccess));
        console.log(onSuccess);
        
          var url: string = this.shared.baseUrl + this.shared.TWITTER;
          //alert(url)
             var signindata = {
              full_name: onSuccess.userName,
              email: onSuccess.userName,
              image:"https://s3.us-east-2.amazonaws.com/ecoprofilephoto/profilepic/nophoto.jpg",
              twitter_id:onSuccess.userId
            }
          //  alert("bhumika")
            var serialized_data = this.Cmn.serializeObj(signindata);
            console.log(serialized_data)
               // alert(JSON.stringify(signindata));
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
                 // alert("grover")
                   Loading.dismiss();
                  //alert(JSON.stringify(resolve))
                console.log(resolve);
                if(resolve.error==0){
                    localStorage.setItem('userid', resolve.data._id);  
                    localStorage.setItem('twitter', resolve.data._id);  
                     let toast = this.toastCtrl.create({
            message: resolve.message,
            duration: 3000,
            position: 'middle'
          });
           toast.present();
           this.navCtrl.push(MyprofilePage)
                }else{
                    
                }
              })
              })
        
        
    }, error => {
         alert('error')
        //  alert('Install Twitter App to login');
          alert(JSON.stringify(error));
        console.log(error);
      });
        }
        
        
//         twLogin(): void {
//    this.twitter.login().then(response => {
//      const twitterCredential = firebase.auth.TwitterAuthProvider.credential(response.token, response.secret);
//
//      firebase.auth().signInWithCredential(twitterCredential).then(userProfile => {
//        this.zone.run(() => {
//          this.userProfile = userProfile;
//          this.userProfile.twName = response.userName;
//          console.log(this.userProfile);
//          this.email = this.userProfile.twName;
//          this.name = this.userProfile.displayName;
//          this.twitter_id = this.userProfile.uid;
//          this.image = this.userProfile.photoURL;
//          console.log(this.email + ' ' + this.name)
//
//          this.twApiLogin(this.email, this.name, this.twitter_id, this.image);
//
//        });
//      }, error => {
//        console.log(error);
//      });
//    }, error => {
//      console.log("Error connecting to twitter: ", error);
//    });
//  }
}
