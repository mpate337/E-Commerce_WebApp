import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are logged out', {
      cssClass:'alert-success',
      timeout: 3000
    });
    this.router.navigate(['/']);
    return false;
  }
  
  onHomeClick(){
    var user = JSON.parse(localStorage.getItem('id_token'))
    var admin = JSON.parse(localStorage.getItem('id_tokenAdmin'))
    console.log('user', user, admin)
    if(user){
      this.router.navigate(['/dashboard'])
    }else if(admin){
      this.router.navigate(['/admin/viewItem'])
    }else{
      this.router.navigate(['/'])
    }
  }

}
