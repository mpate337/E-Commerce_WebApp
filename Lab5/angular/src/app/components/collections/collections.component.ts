import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  collections:any;
  array:any;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
    this.getCollections()
    this.array = []
  }

  getCollections(){
    this.authService.showCollection().subscribe(collections => {
      this.collections = collections.array[0];
      for(var i=0;i<collections.array[0].length;i++){
        this.array.push(collections.array[0][i]._id)
      }
      console.log(collections.array[0], this.array ,"abcd")
    },
    err => {
      console.log(err);
      return false;
    });
  }

  collectionAvbl(){
    this.authService.collectionAvbl(this.array).subscribe(res => {
      console.log(res)
    })
  }
}
