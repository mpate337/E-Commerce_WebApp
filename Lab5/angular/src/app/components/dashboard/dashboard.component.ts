import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items: any;
  added: Array<any>;
  constructor(
    private authService:AuthService,
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
  ) { }

  ngOnInit() {
    this.getItems();
    this.added = [];
  }

  getItems() {
    this.authService.getItems().subscribe(items => {
      this.items = items.items;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  addToCart(id){
    var qty = (<HTMLInputElement>document.getElementById("qty_entered"+id)).value
    this.added.push({"id": id,"qty": qty})
    console.log(this.added)
    this.addToFreq(id)
  }

  addToFreq(id){
    this.authService.addToFreq(id).subscribe(res => {
      console.log(res)
    })
  }

  showCart(){
    this.authService.showCart(this.added).subscribe(res => {
      console.log(res)
    });
  }

  addToCollection(id){
    this.authService.addToCollection(id).subscribe(res => {
      console.log(res)
    })
  }

  rating(id){
    var stars = {
      stars: (<HTMLInputElement>document.getElementById("rate"+id)).value
    }
    var ratingValue = (<HTMLInputElement>document.getElementById("rate"+id)).value;
    if(!this.validateService.validateRating(ratingValue)){
      this.flashMessage.show('Rating should be between 1 to 5', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    this.authService.rating(id, stars).subscribe(res => {
      console.log(res)
      window.location.reload()
    })
  }
}
