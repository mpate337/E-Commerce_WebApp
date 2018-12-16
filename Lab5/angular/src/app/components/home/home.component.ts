import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: any;
  constructor(
    private authService:AuthService,
  ) { }

  ngOnInit() {
    this.getItems();
    this.items= []
  }

  getItems() {
    this.authService.getItems().subscribe(items => {
      // console.log(items.items.length)
      for(var i=0; i<items.items.length; i++){
        // console.log(items.items[i].item_freq >= 5)
        if(items.items[i].item_freq >= 5){
          this.items.push(items.items[i])
        }
      }
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
