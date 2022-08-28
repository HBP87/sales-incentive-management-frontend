import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { RestService } from '../services/rest.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private rest: RestService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogin(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    this.rest.login(username, password).subscribe((loginResponse) => {
      const token = loginResponse.token;
      const role = loginResponse.authorities[0];
      const user = { name: username, role: role };
      localStorage.setItem('token', token);
      // localStorage.setItem('user', JSON.stringify(user));
      this.userService.setUser(user);
      if (role === 'ROLE_ADMIN') {
        this.router.navigate(['admin']);
      } else {
        this.router.navigate(['salesperson']);
      }
    });
  }
}
