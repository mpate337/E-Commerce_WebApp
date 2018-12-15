import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  item: any;
  item_name: String;
  item_quantity: String;
  item_price: String;
  item_tax: String;

  constructor(
    private authService:AuthService,
    private router:Router,
    private route: ActivatedRoute, 
    private flashMessage:FlashMessagesService
  ) { }

  editItem(){
    const item = {
      item_name :  this.item_name,
      item_quantity : this.item_quantity,
      item_price : this.item_price,
      item_tax : this.item_tax
    }
    this.route.params.subscribe(params => {
      this.authService.updateItem(item, params['id']).subscribe(data => {
        console.log(data, item, params['id'])
        if(data.success){
          this.flashMessage.show('Item has updated', {
            cssClass: 'alert-success',
            timeout: 5000});
          this.router.navigate(['admin/viewItem']);
        } else {
          this.flashMessage.show(data.msg, {
            cssClass: 'alert-danger',
            timeout: 5000});
          this.router.navigate(['admin/viewItem']);
        }
      });
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.item = this.authService.editItem(params['id']).subscribe(res => {
        this.item = res;
      });
    });
  }
}