import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  user: any;
  admin: any;
  token: any;

  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register', user,{headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user,{headers: headers})
      .map(res => res.json());
  }

  authenticateAdmin(admin){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate/admin', admin,{headers: headers})
      .map(res => res.json());
  }

  storeAdminData(token, admin){
    localStorage.setItem('id_tokenAdmin', token);
    localStorage.setItem('admin', JSON.stringify(admin));
    this.token = token;
    this.admin = admin;
  }

  getUsers(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/admin/viewUsers', {headers: headers})
      .map(res => res.json());
  }

  deactivateUser(id){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/admin/deactivate/'+ id, {headers: headers})
      .map(res => res.json());
  }

  addToAdmin(id){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/admin/addtoadmin/'+ id, {headers: headers})
      .map(res => res.json());
  }

  addToCollection(id){
    console.log(JSON.parse(localStorage.getItem('user')))
    let user_id = JSON.parse(localStorage.getItem('user'))
    const url = 'http://localhost:3000/users/collection/' +id
    return this.http.post(url,user_id).map(res => res.json())
  }

  showCollection(){
    let user_id = JSON.parse(localStorage.getItem('user'));
    const url = 'http://localhost:3000/users/showcollection';
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(url, user_id, {headers: headers})
      .map(res => res.json());
  }

  collectionAvbl(array){
    let user_id = JSON.parse(localStorage.getItem('user'));
    const url = 'http://localhost:3000/users/changeCollection';
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put(url, array, {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  logout(){
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

  addItem(item){
    return this.http.post('http://localhost:3000/users/admin/addItem', item)
      .map(res => res.json());
  }

  getItems(){
    return this.http.get('http://localhost:3000/users/admin/viewItem')
      .map(res => res.json());
  }

  editItem(id) {
    const url = 'http://localhost:3000/users/admin/editItem/' + id;
    return this.http.get(url).map(res => res.json());
  }

  updateItem(item, id){
    const url = 'http://localhost:3000/users/admin/updateItem/' + id;
    return this.http.post(url, item).map(res => res.json());
  }

  deleteItem(id){
    const url = 'http://localhost:3000/users/admin/deleteItem/' + id;
    return this.http.get(url).map(res => res.json());
  }

  showCart(param){
    const url = 'http://localhost:3000/users/cart';
    return this.http.post(url, param).map(res => res.json());
  }

  addToFreq(id){
    const url = 'http://localhost:3000/users/counter/'+id;
    return this.http.post(url,'').map(res => res.json());
  }

  rating(id, stars){
    console.log(stars)
    const url = 'http://localhost:3000/users/rating/'+id;
    return this.http.post(url, stars).map(res => res.json());
  }
}
