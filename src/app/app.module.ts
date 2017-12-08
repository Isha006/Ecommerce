import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { GetstartedPage } from '../pages/getstarted/getstarted';
import { TransitionPage } from '../pages/transition/transition';
import { AddPage } from '../pages/add/add';
import { NotificationPage } from '../pages/notification/notification';
import { ProfilePage } from '../pages/profile/profile';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { Terms_conditionPage } from '../pages/terms_condition/terms_condition';
import { Privacy_policyPage } from '../pages/privacy_policy/privacy_policy';
import { DescriptiononePage } from '../pages/descriptionone/descriptionone';
import { ProductpricePage } from '../pages/productprice/productprice';
import { ProductconfirmPage } from '../pages/productconfirm/productconfirm';
import { MyprofilePage } from '../pages/myprofile/myprofile';
import { SettingPage } from '../pages/setting/setting';
import { Change_emailPage } from '../pages/change_email/change_email';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { Shipping_addressPage } from '../pages/shipping_address/shipping_address';
import { PaymentPage } from '../pages/payment/payment';
import { ForgotPage } from '../pages/forgot/forgot';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CommonProvider } from '../providers/common/common';
import { SharedProvider } from '../providers/shared/shared';

////////////////////////////////
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http, HttpModule, JsonpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { Camera, CameraOptions } from '@ionic-native/camera';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
	GetstartedPage,
	TransitionPage,
	AddPage,
	NotificationPage,
	ProfilePage,
	SigninPage,
	SignupPage,
	Terms_conditionPage,
	Privacy_policyPage,
	DescriptiononePage,
	ProductpricePage,
	ProductconfirmPage,
	MyprofilePage,
	SettingPage,
	Change_emailPage,
	ChangepasswordPage,
	Shipping_addressPage,
	PaymentPage,
        ForgotPage,
        EditprofilePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
	GetstartedPage,
	TransitionPage,
	AddPage,
	NotificationPage,
	ProfilePage,
	SigninPage,
	SignupPage,
	Terms_conditionPage,
	Privacy_policyPage,
	DescriptiononePage,
	ProductpricePage,
	ProductconfirmPage,
	MyprofilePage,
	SettingPage,
	Change_emailPage,
	ChangepasswordPage,
	Shipping_addressPage,
	PaymentPage,
        ForgotPage,
        EditprofilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonProvider,
    SharedProvider,
    GooglePlus,
    Facebook,
    TwitterConnect,
    Camera
   

  ]
})
export class AppModule {}
