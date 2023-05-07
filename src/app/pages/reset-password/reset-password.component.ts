import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "src/app/services/auth.service";
import { ToastService } from "src/app/services/toast.service";
import { SharedModule } from "src/app/shared/shared.module";
import { ResetPasswordDialogComponent } from "./dialogs/reset-password-dialog.component";

@Component({
  standalone: true,
  imports: [ CommonModule, SharedModule ],
  selector: "app-reset-password",
  template: `
    <div
      class="p-5"
      style="
        display: grid;
        place-items: center;
        width: 100vw;
        height: 100vh;
        background: url(/assets/images/reset-password.jpg);
        background-size: cover;
      "
    >
      <div
        class="card shadow-lg"
        style="
          background: #0006;
          backdrop-filter: blur(10px);
          max-width: 460px;
        ">
          <div class="card-body p-5 text-white">

            <h1 class="display-6">
              {{
                resetCode
                  ? "Change password"
                  : "Email address"
                }}
            </h1>

            <p class="lead">
              {{
                resetCode
                  ? "Compile the form and submit to change your password."
                  : "You'll receive an email containing the address to change your password."
              }}
            </p>

            <ng-container *ngIf="resetCode; else phase1">
              <form novalidate>
                <div class="flexgrid flexgrid--1">
                  
                  <app-input
                    label="Email *"
                    name="phase2Email"
                    [ngControl]="phase2EmailCtrl"
                  ></app-input>
    
                  <app-input
                    label="New password *"
                    name="phase2Password"
                    [type]="passwordShown ? 'text' : 'password'"
                    [ngControl]="phase2PasswordCtrl"
                  ></app-input>
                    
                  <div>

                    <app-input
                      label="New password confirm *"
                      name="phase2PasswordConfirm"
                      [type]="passwordShown ? 'text' : 'password'"
                      [ngControl]="phase2PasswordConfirmCtrl"
                    ></app-input>

                    <div class="text-end mt-2">
                      <button
                        class="btn btn-link text-reset"
                        (click)="passwordShown = !passwordShown"
                      >
                        <ng-container *ngIf="passwordShown; else showPsw">
                          Hide password
                        </ng-container>
                        <ng-template #showPsw>
                          Show password
                        </ng-template>
                      </button>
                    </div>
                  </div>
    
                  <div class="text-center">
                    <button
                      class="btn btn-primary"
                      [disabled]="phase2Form.invalid"
                      (click)="phase2Send()"
                    >
                      <ng-container *ngIf="loading; else notLoading">
                        Sending <div class="spinner-border spinner-border-sm"></div>
                      </ng-container>
                      <ng-template #notLoading>
                        Send <i class="bi bi-send"></i>
                      </ng-template>
                    </button>
                  </div>
                </div>
              </form>
            </ng-container>
            <ng-template #phase1>
              <form novalidate>
                <div class="flexgrid flexgrid--1">
  
                  <app-input
                    label="Email *"
                    name="phase1Email"
                    [ngControl]="phase1EmailCtrl"
                  ></app-input>
    
                  <div class="text-center">
                    <button
                      class="btn btn-primary"
                      [disabled]="phase1Form.invalid"
                      (click)="phase1Send()"
                    >
                      <ng-container *ngIf="loading; else notLoading">
                        Sending <div class="spinner-border spinner-border-sm"></div>
                      </ng-container>
                      <ng-template #notLoading>
                        Send <i class="bi bi-send"></i>
                      </ng-template>
                    </button>
                  </div>
                </div>
              </form>
            </ng-template>
          </div>
      </div>
    </div>
  `
})
export class ResetPasswordComponent {

  resetCode!: string;

  phase1EmailCtrl = new FormControl(null, [ Validators.required, Validators.email ]);

  phase1Form = new FormGroup({
    email: this.phase1EmailCtrl
  });

  phase2EmailCtrl = new FormControl(null, [ Validators.required, Validators.email ]);
  phase2PasswordCtrl = new FormControl(null, [ Validators.required ]);
  phase2PasswordConfirmCtrl = new FormControl(null, [ Validators.required ]);

  phase2Form = new FormGroup({
    email: this.phase2EmailCtrl,
    password: this.phase2PasswordCtrl
  });

  passwordShown = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal,
    private toaster: ToastService
  ) {
    this.resetCode = route.snapshot.queryParams["reset-code"];
  }

  phase1Send() {

    if (!this.phase1EmailCtrl.value) return;

    this.loading = true;

    this.authService
      .resetPasswordPhase1(this.phase1EmailCtrl.value)
      .subscribe(
        () => {

          this.loading = false;

          this.phase1Form.reset();

          this.modalService.open(
            ResetPasswordDialogComponent,
            { centered: true }
          );
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

  phase2Send() {

    if (!this.phase2EmailCtrl.value || !this.phase2PasswordCtrl.value)
      return;

    if (this.phase2PasswordCtrl.value !== this.phase2PasswordConfirmCtrl.value)
      return this.toaster.show(
        "The two passwords do not match.",
        { classname: 'bg-danger text-light' }
      );

    this.loading = true;

    this.authService
      .resetPasswordPhase2(
        this.phase2EmailCtrl.value,
        this.resetCode,
        this.phase2PasswordCtrl.value
      )
      .subscribe(
        async () => {

          this.loading = false;

          this.toaster.show(
            "Password changed successfully!",
            { classname: 'bg-success text-light' }
          );

          setTimeout(() =>
            this.router.navigateByUrl('/login')
          , 500);
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

}