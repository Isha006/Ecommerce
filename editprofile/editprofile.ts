import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { Change_emailPage } from '../change_email/change_email';
import { MyprofilePage } from '../myprofile/myprofile';

@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html'
})
export class EditprofilePage {

  constructor(public navCtrl: NavController) {

  }
  openchangepasswordPage(){
	  this.navCtrl.push(ChangepasswordPage)
  }
  openchangeemailPage(){
	  this.navCtrl.push(Change_emailPage)
  }
  openprofilePage(){
	  this.navCtrl.push(MyprofilePage)
  }

}
