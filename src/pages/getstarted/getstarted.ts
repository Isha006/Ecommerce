import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-getstarted',
  templateUrl: 'getstarted.html'
})
export class GetstartedPage {

  constructor(public navCtrl: NavController) {

  }
  to_tabs(){
    this.navCtrl.push(TabsPage)
  }

}
