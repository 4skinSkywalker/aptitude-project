import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  standalone: true,
  imports: [ CommonModule, SharedModule ],
  selector: "app-reset-password",
  template: ``
})
export class ResetPasswordComponent {

}