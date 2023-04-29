import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';
import { ToastsContainer } from './shared/components/toasts-container.component';
import { SharedModule } from './shared/shared.module';
import { Roles } from './models/user';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastsContainer,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: 'viewerGuard',
      useFactory: (authService: AuthService, router: Router) =>
        new AuthGuard([ Roles.Viewer ], authService, router),
      deps: [ AuthService, Router ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
