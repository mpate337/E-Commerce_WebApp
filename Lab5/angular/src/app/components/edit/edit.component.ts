import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { ItemService } from './../item.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  item: any;

  updateItem(name, price, quantity, tax) {
    // this.route.params.subscribe(params => {
    // // this.service.updateItem(name, price, quantity, tax, params['id']);
    // this.router.navigate(['index']);

  // });
}

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.item = this.service.editItem(params['id']).subscribe(res => {
    //     this.item = res;
    //   });
    // });
  }
}