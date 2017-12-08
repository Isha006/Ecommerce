import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductconfirmPage } from '../productconfirm/productconfirm';

@Component({
  selector: 'page-productprice',
  templateUrl: 'productprice.html'
})
export class ProductpricePage {

  constructor(public navCtrl: NavController) {

  }
  openproductconfirm(){
	  this.navCtrl.push(ProductconfirmPage)
  }

}
