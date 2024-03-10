import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponentComponent } from './pages/login-component/login-component.component';
import { RegisterComponentComponent } from './pages/register-component/register-component.component';
import { AuthGuard } from './guards/authentication.guard';

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    component: LoginComponentComponent,
  },
  {
    path: "register",
    component: RegisterComponentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
