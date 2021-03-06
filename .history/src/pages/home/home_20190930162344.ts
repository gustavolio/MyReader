import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public feeds: Array<string>;
  private url: string = "https://www.reddit.com/new.json";  

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {

    this.fetchContent();

  }

  fetchContent ():void {
    let loading = this.loadingCtrl.create({
      content: 'Fetching content...'
    });

    loading.present();

    this.http.get(this.url).map(res => res.json())
      .subscribe(data => {
        this.feeds = data.data.children;
        loading.dismiss();
      });  
  }


  itemSelected (url: string):void {
      let urlModal = this.modalCtrl.create("UrlModalPage", {urlParam: url});
      urlModal.present();

      urlModal.onDidDismiss(data =>{
        console.log(data);
      });
  } 

  doInfinite(infiniteScroll) {
    let paramsUrl = (this.feeds.length > 0) ? this.feeds[this.feeds.length - 1].data.name : "";
    this.http.get(this.olderPosts + paramsUrl).map(res => res.json()).subscribe(data => {
          this.feeds = this.feeds.concat(data.data.children);

          this.feeds.forEach((e, i, a) => {
            if (!e.data.thumbnail || e.data.thumbnail.indexOf('b.thumbs.redditmedia.com') === -1 ) {  
              e.data.thumbnail = 'https://www.redditstatic.com/icon.png';
            }
          })
          infiniteScroll.complete();
        }); 
  }  
}