import { Component } from '@angular/core';
import { ServiceService } from '../../core/services/service.service';
import { environment } from '../../../environments/environment';
import { UtilsService } from '../../core/services/utils.service';
import { Data, Model } from '../../core/interface/model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isLoading: boolean = false;
  showPassword: boolean = false;
  form: FormGroup;
  constructor(private loginService: ServiceService, private utilsService: UtilsService, private fb: FormBuilder,private router:Router ){
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.loginService.url = environment.apiUrlNode + "auth/login";
    const data = this.form.value;
    this.isLoading=true;
    if (data) {
      this.loginService.store(data).subscribe(
        (res: Model<Data>) => {
          // const result = this.utilsService.parseResponse(res);
          // this.utilsService.show(result.type, res.data.message);
          localStorage.setItem('token', res.data.token);
          this.isLoading = false;
          if (res.data.user.role === "admin") {
            this.router.navigate(['/dashbord']);
          } else {
            this.router.navigate(['/']);
          }
        },
        (error: HttpErrorResponse) => {
          const result = this.utilsService.parseResponse(error);
          this.utilsService.show(result.type, result.message);
          this.isLoading = false;
        }
      )
    }
  }

}
