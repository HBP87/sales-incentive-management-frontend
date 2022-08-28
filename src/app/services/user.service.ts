import { DoCheck, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user.model';

interface myObj {
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User;
  userUpdated = new BehaviorSubject<User>({ name: '', role: '' });
  constructor(private router: Router) {}

  autoLogin() {
    if (localStorage.getItem('user') != null) {
      const fetchedUserString = localStorage.getItem('user');
      const fetchedUser: myObj =
        fetchedUserString !== null ? JSON.parse(fetchedUserString) : null;
      if (fetchedUser == null) {
        this.router.navigate(['/']);
        return;
      }
      this.user = fetchedUser;
      this.userUpdated.next(this.user);
    }
  }

  setUser(user: { name: any; role: string }) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(this.user));
    this.userUpdated.next(this.user);
  }
}
