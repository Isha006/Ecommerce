import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SharedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SharedProvider Provider');
  }
public baseUrl: string="http://ecommerce-env.us-east-2.elasticbeanstalk.com/";

///////Api////////////
public SIGNUP= "api/users/register";
public SIGNIN= "api/users/login";
public FORGOT= "api/forgetpass";
public FACEBOOK="api/users/facebooklogin";
public TWITTER="api/users/twitterlogin";
public SHOW_PROFILE="api/users/fetchuserdeatils";
public EDIT_PROFILE="api/users/editusrdetails ";
public CHANGE_PASSWORD="api/change_password_app";
public IMAGE_CHANGE="api/users/post_user_image_app";
public CHANGE_EMAIL="api/change_email";
;
}
