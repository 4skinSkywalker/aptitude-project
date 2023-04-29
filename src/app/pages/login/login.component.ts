import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loading = false;

  usernameCtrl = new FormControl<string>("", [Validators.required]);
  emailCtrl = new FormControl<string>(
    "federicotrotta92@gmail.com",
    [
      Validators.required,
      Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    ]
  );
  passwordCtrl = new FormControl<string>("questa è una prova", [Validators.required]);

  signUpForm!: FormGroup;
  signInForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToastService
  ) { }

  ngOnInit() {

    this.signUpForm = new FormGroup({
      username: this.usernameCtrl,
      email: this.emailCtrl,
      password: this.passwordCtrl
    });

    this.signInForm = new FormGroup({
      email: this.emailCtrl,
      password: this.passwordCtrl
    });
  }

  signUp() {
    const val = this.signUpForm.value;

    if (!val.username || !val.email || !val.password) return;
  }

  signIn() {

    const val = this.signInForm.value;

    if (!val.email || !val.password) return;

    this.loading = true;
    this.authService
      .signIn(val.email, val.password)
      .subscribe(
        () => {
          this.toaster.show(
            "Signed in successfully!",
            { classname: 'bg-success text-light' }
          );
          this.loading = false;
          this.router.navigateByUrl('/dashboard');
        },
        () => {
          this.toaster.show(
            "Invalid email or password.",
            { classname: 'bg-danger text-light' }
          );
          this.loading = false;
        }
      );
  }
}
