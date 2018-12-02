import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  items: any;
  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
    this.getItems();
    // var urlParams = [];
    // window.location.search.replace("?", "").split("&").forEach(function (e, i) {
    //     var p = e.split("=");
    //     urlParams[p[0]] = p[1];
    // });

    // if(urlParams["true"]) {}else{

    //     let win = (window as any);
    //     win.location.search = '?true=1';
    // }
  }

  getItems() {
    this.authService.getItems().subscribe(items => {
      this.items = items.items;
      // console.log(items.items,"abcd", this.items[0].item_name)
    },
    err => {
      console.log(err);
      return false;
    });
  }

  // deleteItem(id) {
  //   this.service.deleteItem(id).subscribe(res => {
  //     console.log('Deleted');
  //     window.location.reload()
  //   });
  // }
}