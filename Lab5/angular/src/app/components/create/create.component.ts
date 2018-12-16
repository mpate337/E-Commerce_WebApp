import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  item_name: String;
  item_quantity: String;
  item_price: String;
  item_tax: String;
  item_desc: String;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }
    
  addItem(){
    const item = {
      item_name :  this.item_name,
      item_quantity : this.item_quantity,
      item_price : this.item_price,
      item_tax : this.item_tax,
      item_desc : this.item_desc
    }

    this.authService.addItem(item).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Item has added', {
          cssClass: 'alert-success',
          timeout: 5000});
        this.router.navigate(['admin/viewItem']);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
        this.router.navigate(['admin/addItem']);
      }
    });
  }
  ngOnInit() {
  }

}
