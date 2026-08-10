import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../core/services/service.service';
import { environment } from '../../../environments/environment';
import { Data, Model, Service } from '../../core/interface/model';
import { UtilsService } from '../../core/services/utils.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit {

  isLoading: boolean = false;
  isSubmitting: boolean = false;
  showModal: boolean = false;
  services: Service[] = [];
  serviceI: any;
  editingService: Service | null = null;
  form: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  constructor(
    private service: ServiceService,
    private utilsSevice: UtilsService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [''],
      price: [''],
      description: [''],
      duration: [''],
      image: [null]
    });

  }

  ngOnInit(): void {
    this.getService();
  }

  openModal(): void {
    this.editingService = null;
    this.form.reset();
    this.selectedFile = null;
    this.imagePreview = null;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.form.reset();
    this.selectedFile = null;
    this.imagePreview = null;
  }

  getService(): void {
    this.service.url = environment.apiUrlNode + 'services';
    this.isLoading = true;
    this.service.all().subscribe({
      next: (res: Model<Data>) => {
        this.services = res.data.services;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        const result = this.utilsSevice.parseResponse(error);
        this.utilsSevice.show(result.type, result.message);
        this.isLoading = false;
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) { return; }
    this.selectedFile = file;
    // Ajouter le fichier au formulaire
    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();
    // Prévisualisation
    const reader = new FileReader();
    reader.onload = () => { this.imagePreview = reader.result as string; };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value || '');
    formData.append('price', this.form.get('price')?.value || '');
    formData.append('description', this.form.get('description')?.value || '');

    // Ajouter l'image seulement si une nouvelle image est sélectionnée
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    this.service.url = environment.apiUrlNode + 'services';
    if (this.editingService) {
      this.service.update(formData, this.editingService.id).subscribe({
        next: (res: any) => {
          this.isSubmitting = false;
          this.utilsSevice.show('success', res?.message || 'Service modifié avec succès');
          this.closeModal();
          this.getService();
        },
        error: (error: HttpErrorResponse) => {
          this.isSubmitting = false;
          const result = this.utilsSevice.parseResponse(error);
          this.utilsSevice.show(result.type, result.message);
        }

      });

    }
    else {
      this.service.store(formData).subscribe({
        next: (res: any) => {
          this.isSubmitting = false;
          this.utilsSevice.show('success', res?.message || 'Service ajouté avec succès');
          this.closeModal();
          this.getService();
        },
        error: (error: HttpErrorResponse) => {
          this.isSubmitting = false;
          const result = this.utilsSevice.parseResponse(error);
          this.utilsSevice.show(result.type, result.message);
        }
      });
    }
  }

  async deleteService(id: number): Promise<void> {
    const confirmed = await this.utilsSevice.confirm('Supprimer le service ?', 'Cette action est irréversible.');
    if (!confirmed) { return; }
    this.service.url = environment.apiUrlNode + 'services';
    this.service.delete(id).subscribe({
      next: (res: any) => {
        this.utilsSevice.show('success', res?.message || 'Service supprimé avec succès');
        this.getService();
      },
      error: (error: HttpErrorResponse) => {
        const result = this.utilsSevice.parseResponse(error);
        this.utilsSevice.show(result.type, result.message);
      }
    });
  }

  openModalServiceUpdate(id: number): void {
    const service = this.services.find(s => s.id === id);
    if (!service) { return; }
    this.editingService = service;
    this.form.patchValue({
      name: service.name,
      price: service.price,
      description: service.description
    });
    this.imagePreview = service.image || null;
    this.showModal = true;
  }

  showService(id: number): void {
    this.service.url = environment.apiUrlNode + "services";
    this.service.show(id).subscribe({
      next: (res: Model<Data>) => {
        this.serviceI = res.data.service;
      }, error: (error: HttpErrorResponse) => {
        const result = this.utilsSevice.parseResponse(error);
        this.utilsSevice.show(result.type, result.message);
      }
    })
  }

  onEditFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) { return; }
    const reader = new FileReader();
    reader.onload = () => {
      console.log('Nouvelle image :', reader.result);
    };
    reader.readAsDataURL(file);
  }
}

