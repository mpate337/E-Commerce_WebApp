import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: any;
  avblItem: any;
  constructor(
    private authService:AuthService,
  ) { }

  ngOnInit() {
    this.getItems();
    this.items= [];
    this.avblItem = []
  }

  getItems() {
    this.authService.getItems().subscribe(items => {
      // console.log(items.items.length)
      for(var i=0; i<items.items.length; i++){
        // console.log(items.items[i].item_freq >= 5)
        if(items.items[i].item_freq >= 5){
          this.items.push(items.items[i])
        }
        if(items.items[i].item_quantity > 0){
          this.avblItem.push(items.items[i])
        }
      }
    },
    err => {
      console.log(err);
      return false;
    });
  }

  function(){
    var x = document.getElementById("showme");
    console.log(x.style.display )
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

}
