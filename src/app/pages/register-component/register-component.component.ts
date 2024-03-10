import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { SecretCodeComponentComponent } from '../login-component/secret-code-component/secret-code-component.component';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toastr/toastr.service';
import { UsersService } from 'src/app/services/users/users.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss']
})
export class RegisterComponentComponent implements OnInit{
constructor(
  private dialog: MatDialog,
  titleService: Title,
  private usersService: UsersService,
  private router: Router,
  private toastService: ToastService,
  private authService: AuthService,
  formBuilder: FormBuilder
  ){
    titleService.setTitle("Belot Register");
    this.form = formBuilder.group({
      username: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")
      ]],
      confirmPassword: ['', Validators.required]
    });
    this.formControls = Object.keys(this.form.controls).map(key => {
      return {
        name: key,
        control: this.form.get(key)
      };
    });
  }

  formControls: any[] = [];
  form: FormGroup;

  isUsernameTaken = false;
  username: string = "";
  confirmPass: string = "";
  isPasswordMatch = true;

  passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  checkUsernameAvailability(prompt: string){
    if (prompt !== ""){
      this.usersService.checkUsername(prompt).subscribe(res=>{
        this.isUsernameTaken = res.data;
      });
    }
  }

  confirmPasswordMatch(prompt: string){
    if (prompt === this.form.value.password){
      this.isPasswordMatch = true;
    } else {
      this.isPasswordMatch = false;
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem("secret") !== "true"){
      const dialogRef = this.dialog.open(SecretCodeComponentComponent);

      dialogRef.componentInstance.secretEmitter.subscribe(res => {
        this.usersService.verifyCode(res).subscribe({
          next: res => {
            if (res.data) {
            } else {
              this.toastService.showErrorToast(
                'Error',
                'Wrong Secret Code',
              );
              this.router.navigate(['/login']);
            }
          },
          error: err => {
            this.toastService.showErrorToast(
              'Error',
              'Something went wrong',
            );
            this.router.navigate(['/login']);
          }
        })
      });
    } else {
      localStorage.setItem("secret", "false");
    }
    this.formControls.forEach(contr=>{
      console.log(contr)

    })
  }

  register(){
    if (this.form.invalid){}

    this.authService.register(this.form.value.username, this.form.value.password).subscribe(res=>{
      this.router.navigate(['login'])
    });
  }

  getValidationMessage(control: any) {
    if (control.control.errors.required) {
      return 'Field is required';
    } else if (control.control.errors.minlength) {
      return `Minimum length is ${control.control.errors.minlength.requiredLength}`;
    } else if (control.control.errors.pattern) {
      return 'Your password does not meet the required format. Please ensure that your password contains at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character among @$!%*?&.';
    }
    return '';
  }

}
