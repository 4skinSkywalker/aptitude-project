import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { timer } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  standalone: true,
  imports: [ CommonModule, SharedModule ],
  selector: "app-confirm-password",
  template: `
    <div
      class="p-5"
      style="
        display: grid;
        place-items: center;
        width: 100vw;
        height: 100vh;
        background: url(/assets/images/confirm-email.jpg);
        background-size: cover;
      "
    >
      <div class="card shadow-lg" style="background: #fff4; backdrop-filter: blur(10px);">
        <div class="card-body p-5">

          <h1 class="display-6">We are glad to see you!</h1>

          <ng-container *ngIf="loading; else notLoading">
            <div class="text-center py-4">
              <div class="spinner-border"></div>
            </div>
          </ng-container>
          <ng-template #notLoading>
            <ng-container *ngIf="inError; else notInError">
              <p class="lead">
                Something went wrong and we were not capable of confirming your email address.
              </p>
            </ng-container>
            <ng-template #notInError>

              <p class="lead">
                Your email is confirmed, now you can access the platform.
              </p>

              <p class="lead">
                You'll be redirected to the login page in {{ countdown / 1000 }} seconds.
              </p>
            </ng-template>
          </ng-template>

          <a class="text-white" routerLink="/login">Go to login</a>
        </div>
      </div>
    </div>
  `
})
export class ConfirmEmailComponent implements OnInit {

  loading = true;
  confirmed = false;
  inError = false;
  countdown = 5 * 1000;
  _id!: string | null;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this._id = this.route.snapshot.paramMap.get('_id');

    if (!this._id) return;

    this.authService
      .confirmEmail(this._id)
      .subscribe(
        () => {

          this.loading = false;

          setTimeout(
            () => this.router.navigateByUrl("/login"),
            this.countdown
          );

          const interval = setInterval(
            () => {
              this.countdown -= 1000;
              if (!this.countdown) clearInterval(interval);
            },
            1000
          );
        },
        () => {
          this.loading = false;
          this.inError = true;
        }
      );
  }
}