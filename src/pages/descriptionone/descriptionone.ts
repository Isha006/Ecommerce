import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductpricePage } from '../productprice/productprice';

@Component({
  selector: 'page-descriptionone',
  templateUrl: 'descriptionone.html'
})
export class DescriptiononePage {

  constructor(public navCtrl: NavController) {

  }
  productprice(){
	  this.navCtrl.push(ProductpricePage)
  }

}
