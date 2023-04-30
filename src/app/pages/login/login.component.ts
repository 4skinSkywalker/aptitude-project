import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { EmailConfirmationDialogComponent } from './dialogs/email-confirmation-dialog.component';
import { ResetPasswordDialogComponent } from './dialogs/reset-password-dialogs.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loading = false;

  emailValidators = [ Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) ];

  signUpUsernameCtrl = new FormControl<string>("", [Validators.required, Validators.minLength(3)])
  signUpEmailCtrl = new FormControl<string>("federicotrotta92@gmail.com", this.emailValidators);
  signUpPasswordCtrl = new FormControl<string>("questa è una prova", [Validators.required]);

  signInEmailCtrl = new FormControl<string>("federicotrotta92@gmail.com", this.emailValidators);
  signInPasswordCtrl = new FormControl<string>("questa è una prova", [Validators.required]);

  signUpForm!: FormGroup;
  signInForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToastService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

    this.signUpForm = new FormGroup({
      username: this.signUpUsernameCtrl,
      email: this.signUpEmailCtrl,
      password: this.signUpPasswordCtrl
    });

    this.signInForm = new FormGroup({
      email: this.signInEmailCtrl,
      password: this.signInPasswordCtrl
    });
  }

  async signUp() {

    const val = this.signUpForm.value;

    if (!val.username || !val.email || !val.password) return;

    this.loading = true;

    this.authService
      .signUp(val.username, val.email, val.password)
      .subscribe(
        async () => {
          this.loading = false;
          const modalRef = this.modalService.open(EmailConfirmationDialogComponent, { centered: true });
          await modalRef.result;
        },
        (ex) => {
          this.loading = false;
          this.toaster.show(
            ex.error.error,
            { classname: 'bg-danger text-light' }
          );
        }
      );
  }

  signIn() {

    const val = this.signInForm.value;

    if (!val.email || !val.password) return;

    this.loading = true;
    this.authService
      .signIn(val.email, val.password)
      .subscribe(
        () => {
          this.loading = false;
          this.router.navigateByUrl('/dashboard');
        },
        (ex) => {
          this.loading = false;
          this.toaster.show(
            ex.error.error,
            { classname: 'bg-danger text-light' }
          );
        }
      );
  }

  async forgotPassword() {

    const emailInputEl = document.querySelector('[id^="signInEmail"]') as HTMLInputElement;
    
    if (!this.signInEmailCtrl.value) {
      emailInputEl!.focus();
      this.toaster.show(
        `Type your email in the highlighted field and then click on "I've forgot my password" once again.`,
        { classname: 'bg-info text-light' }
      );
    }
    else if (this.signInEmailCtrl.invalid) {
      this.toaster.show(
        "Invalid email address",
        { classname: 'bg-danger text-light' }
      );
    }

    const modalRef = this.modalService.open(ResetPasswordDialogComponent, { centered: true });
    await modalRef.result;
  }
}
