import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from '../../core/services/service.service';
import { UtilsService } from '../../core/services/utils.service';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { TokenService } from '../../core/services/token.service';
import { environment } from '../../../environments/environment';
import { Data, Model } from '../../core/interface/model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {

  form: FormGroup;
  passwordForm!: FormGroup;
  selectedFile: File | null = null;
  preview: string | ArrayBuffer | null = null;
  user: any;
  showPassword: boolean = false;
  isLoading: boolean = false;
  id: number = 1;

  constructor(private servie: ServiceService, private utilsService: UtilsService, private tokenService: TokenService, private fb: FormBuilder) {
    this.form = fb.group({
      firstName: [''],
      lastName: [''],
      phone: [''],
      address: [''],
      email: [''],
    });

    this.passwordForm = this.fb.group({
      old_password: [''],
      new_password: [''],
      confirm_password: ['']
    });
  }

  ngOnInit(): void {
   // this.getCurrentUser();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = e => this.preview = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() { }

  getCurrentUser() {
    this.tokenService.getCurrentUser().subscribe(
      (res: Model<Data>) => {
      //  console.log(res);
        this.user = res.data.user;
        this.id = this.user.id
        // PatchValue pour remplir le formulaire
        this.form.patchValue({
          firstName: this.user.first_name,
          lastName: this.user.last_name,
          phone: this.user.phone,
          email: this.user.email,
        });
        // Si tu veux afficher l'image existante
        if (this.user.image) {
          this.preview = `${environment.apiUrlNode}/uploads/users/${this.user.image}`;
        }
      },
      (error: HttpErrorResponse) => {
        const result = this.utilsService.parseResponse(error);
        this.utilsService.show(result.type, result.message);
        this.isLoading = false;
      }
    )
  }

  onChangePassword(): void {
    if (this.passwordForm.valid) {
      const formData = new FormData();
      formData.append('old_password', this.passwordForm.get('old_password')?.value);
      formData.append('new_password', this.passwordForm.get('new_password')?.value);

      this.servie.update(formData, this.id).subscribe((res: Model<Data>) => {

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
