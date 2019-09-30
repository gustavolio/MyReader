import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal } from 'ionic-angular';

/**
 * Generated class for the UrlModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage( 
  name: 'ur-modal'
)
@Component({
  selector: 'page-url-modal',
  templateUrl: 'url-modal.html',
})
export class UrlModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UrlModalPage');
  }

}
