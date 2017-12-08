import { Component ,ViewChild} from '@angular/core';
import { Platform ,Nav,MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
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
import { EditprofilePage } from '../pages/editprofile/editprofile';
export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = GetstartedPage;
// pages: Array<{title: string, component: any}>;
// pages2: any;
 @ViewChild(Nav) nav: Nav;
 
 
pages: PageInterface[] = [
    { title: 'Home', pageName: 'TabsPage', tabComponent: 'HomePage', index: 0, icon: 'home' },
    { title: 'Notification', pageName: 'TabsPage',  tabComponent: 'NotificationPage', index: 3, icon: 'home' },
     { title: 'Transition', pageName: 'TabsPage', tabComponent: 'TransitionPage', index: 1, icon: 'contacts' },
     { title: 'Add', pageName: 'TabsPage', tabComponent: 'Tab3Page', index: 2, icon: 'contacts' },
     { title: 'Profile', pageName: '', icon: '' },
   
  ]
  constructor(
      platform: Platform,
      statusBar: StatusBar, 
      splashScreen: SplashScreen,
      private menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  
  openPage(page: PageInterface) {
 alert("open page")
    let params = {};
console.log(page.index)
   // return false;
   

    if (page.index) {
      console.log(page.index);
      params = { tabIndex: page.index};
    }else{
      
    }

    if (this.nav.getActiveChildNav() && page.index != undefined) {
        
        this.nav.getActiveChildNav().select(page.index);
    } else {
      this.nav.setRoot(page.pageName, params);
    }
  }
    isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
  }
  
//  openPage() {
//     
//    // Reset the content nav to have just this page
//    // we wouldn't want the back button to show in this scenario
//    this.nav.setRoot(TransitionPage);
//  }
}
