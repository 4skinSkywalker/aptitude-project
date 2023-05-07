import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  standalone: true,
  imports: [ CommonModule, SharedModule ],
  selector: "app-not-found",
  template: `
    <div
        class="p-5"
        style="
            display: grid;
            align-items: center;
            justify-items: start;
            width: 100vw;
            height: 100vh;
            background:
                radial-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1)),
                url('/assets/images/not-found.jpg');
            background-size: cover;
        "
    >
        <div class="card shadow-lg" style="background: #0000; backdrop-filter: blur(10px);">
            <div class="card-body p-5 text-white">

                <h1 class="display-6">Page not found</h1>

                <p class="lead">If you think there's a problem, then notify to the webmasters. Thanks</p>
                
                <a class="text-reset" routerLink="/home">Go to home</a>
            </div>
        </div>
    </div>
  `
})
export class NotFoundComponent {

}