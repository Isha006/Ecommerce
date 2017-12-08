import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CommonProvider Provider');
  }
  
  public serializeObj(obj) {
 var result = [];
   for (var property in obj)
  result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
return result.join("&");
  
 }

}
