import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  username: string | null;
  // isLoggedIn: boolean;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.userUpdated.subscribe((data) => {
      if (data.name != '') {
        this.username = data.name;
      } else {
        this.username = null;
      }
    });
  }

  onLogout() {
    this.router.navigate(['login']);
    this.userService.setUser({ name: '', role: '' });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
