import { Routes } from '@angular/router';
import { DashbordComponent } from './admin/dashbord/dashbord.component';
import { adminGuard } from './core/guard/admin.guard.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: "dashbord", component: DashbordComponent, canActivate: [adminGuard] },
];
