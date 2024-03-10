import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toastr/toastr.service';
import { SecretCodeComponentComponent } from './secret-code-component/secret-code-component.component';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  isLoggedIn = false;
  isLoginFailed = false;

  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router,
    private toastService: ToastService,
    private dialog: MatDialog,
    titleService: Title,
  ) {
    titleService.setTitle('Belot Login');
  }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem("token") ? true : false;
  }

  async register() {
    const dialogRef = this.dialog.open(SecretCodeComponentComponent);

    dialogRef.componentInstance.secretEmitter.subscribe(res => {
      this.usersService.verifyCode(res).subscribe({
        next: res => {
          if (res.data) {
            localStorage.setItem("secret", "true");
            this.router.navigate(['/register']);
          } else {
            this.toastService.showErrorToast(
              'Error',
              'Wrong Secret Code',
            );
          }
        },
        error: err => {
          this.toastService.showErrorToast(
            'Error',
            'Something went wrong',
          );
        }
      })
    });
  }

  async login() {
    const { username, password } = this.form.value;
    this.authService.login(username, password).subscribe({
      next: (data) => {
        localStorage.setItem("token", data.data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
      },
      error: (e) => {
        if (e.error.message.includes('incorrect')) {
          this.toastService.showErrorToast('Error', 'Wrong credentials');
        } else {
          this.toastService.showErrorToast(
            'Error',
            'Something went wrong',
          );
          console.error(e);
        }
        this.isLoginFailed = true;
      },
      complete: () => {
        this.router.navigate(['/dashboard']);
      },
    });
  }
}
