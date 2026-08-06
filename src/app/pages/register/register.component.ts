import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../core/services/service.service';
import { environment } from '../../../environments/environment';
import { UtilsService } from '../../core/services/utils.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Data, Model } from '../../core/interface/model';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  isloading: boolean = false;
  showPassword: boolean = false;

  constructor(private service: ServiceService, private fb: FormBuilder, private utilsService: UtilsService, private router: Router) {

    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]], // 8 à 15 chiffres
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  ngOnInit(): void {

  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.service.url = environment.apiUrlNode + "auth/login";
    const data = this.form.value;
    if (data) {
      console.log(data);
      
      this.service.store(data).subscribe(
        (res: Model<Data>) => {
          const result = this.utilsService.parseResponse(res);
          this.utilsService.show(result.type, res.data.message);
          this.isloading = false;
          this.router.navigate(['/']);
        },
        (error: HttpErrorResponse) => {
          const result = this.utilsService.parseResponse(error);
          this.utilsService.show(result.type, result.message);
          this.isloading = false;
        }
      )
    }
  }

}
