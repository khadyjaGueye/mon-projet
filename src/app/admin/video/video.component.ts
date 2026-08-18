import { Component, OnInit } from '@angular/core';
import { Data, Model, Video } from '../../core/interface/model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from '../../core/services/service.service';
import { UtilsService } from '../../core/services/utils.service';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { log } from 'console';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent implements OnInit {

  isLoading: boolean = false;
  isSubmitting: boolean = false;
  showModal: boolean = false;
  videos: Video[] = [];
  editingVideo: Video | null = null;
  form: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  videoPreview: string | null = null;

  constructor(private service: ServiceService, private utilsService: UtilsService, private fb: FormBuilder) {
    this.form = fb.group({
      title: [''],
      description: [''],
      video: [null]
    })
  }

  ngOnInit(): void {
    this.getVideo();
  }

  openModal(): void {
    this.editingVideo = null;
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

  openModalVideoUpdate(id: number): void {
    const video = this.videos.find(s => s.id === id);
    if (!video) { return; }
    this.editingVideo = video;
    this.form.patchValue({
      title: video.title,
      description: video.description
    });
    this.imagePreview = video.video || null;
    this.showModal = true;
  }

  getVideo() {
    this.service.url = environment.apiUrlNode + "videos";
    this.service.all().subscribe({
      next: (res: Model<Data>) => {
        this.videos = res.data.videos;
        //  console.log(this.videos);
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        const result = this.utilsService.parseResponse(error);
        this.utilsService.show(result.type, result.message);
        this.isLoading = false;
      }
    })
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (!file) { return; }
    this.selectedFile = file;
    // Ajouter le fichier au formulaire
    this.form.patchValue({ video: file });
    this.form.get('video')?.updateValueAndValidity();
    // Prévisualisation de la vidéo
    const reader = new FileReader();
    reader.onload = () => {
      this.videoPreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;

    const formData = new FormData();
    formData.append('title', this.form.get('title')?.value || '');
    formData.append('description', this.form.get('description')?.value || '');

    // Ajouter l'image seulement si une nouvelle image est sélectionnée
    if (this.selectedFile) {
      formData.append('video', this.selectedFile);
    }
    console.log('title:', formData.get('title'));
    console.log('description:', formData.get('description'));
    console.log('video:', formData.get('video'));

    this.service.url = environment.apiUrlNode + 'videos';
    if (this.editingVideo) {
      this.service.update(formData, this.editingVideo.id).subscribe({
        next: (res: any) => {
          this.isSubmitting = false;
          this.utilsService.show('success', res?.message || 'Video modifié avec succès');
          this.closeModal();
          this.getVideo();
        },
        error: (error: HttpErrorResponse) => {
          this.isSubmitting = false;
          const result = this.utilsService.parseResponse(error);
          this.utilsService.show(result.type, result.message);
        }

      });

    }
    else {
      this.service.store(formData).subscribe({
        next: (res: any) => {
          this.isSubmitting = false;
          this.utilsService.show('success', res?.message || 'Video ajouté avec succès');
          this.closeModal();
          this.getVideo();
        },
        error: (error: HttpErrorResponse) => {
          this.isSubmitting = false;
          const result = this.utilsService.parseResponse(error);
          this.utilsService.show(result.type, result.message);
        }
      });
    }
  }

  async deleteVideo(id: number): Promise<void> {
    const confirmed = await this.utilsService.confirm('Supprimer la vidéo ?', 'Cette action est irréversible.');
    if (!confirmed) { return; }
    this.service.url = environment.apiUrlNode + 'videos';
    this.service.delete(id).subscribe({
      next: (res: any) => {
        this.utilsService.show('success', res?.message || 'Vidéo supprimé avec succès');
        this.getVideo();
      },
      error: (error: HttpErrorResponse) => {
        const result = this.utilsService.parseResponse(error);
        this.utilsService.show(result.type, result.message);
      }
    });
  }

}
