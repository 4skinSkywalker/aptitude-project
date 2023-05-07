import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./site/site.module").then(m => m.SiteModule)
  },
  {
    path: "login",
    loadChildren: () => import("./pages/login/login.module").then(m => m.LoginModule)
  },
  {
    path: "confirm-email/:_id",
    loadComponent: () =>
      import("./pages/confirm-email/confirm-email.component").then(c => c.ConfirmEmailComponent)
  },
  {
    path: "reset-password",
    loadComponent: () =>
      import("./pages/reset-password/reset-password.component").then(c => c.ResetPasswordComponent)
  },
  {
    path: "dashboard",
    loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule),
    canActivate: ["viewerGuard"]
  },
  {
    path: "**",
    loadComponent: () =>
      import("./pages/not-found/not-found.component").then(c => c.NotFoundComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
