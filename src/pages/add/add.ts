import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DescriptiononePage } from '../descriptionone/descriptionone';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {

  constructor(public navCtrl: NavController) {

  }
  opendescriptionone(){
	  this.navCtrl.push(DescriptiononePage)
  }

}
