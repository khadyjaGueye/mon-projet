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
  editingService: Video | null = null;
  form: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(private service: ServiceService, private utilsService: UtilsService, private fb: FormBuilder) { 
    this.form =fb.group({

    })
  }

  ngOnInit(): void {
    this.getVideo();
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

  openModalVideoUpdate(id:number){}

  deleteVideo(id:number){}

  getVideo() {
    this.service.url = environment.apiUrlNode + "videos";
    this.service.all().subscribe({
      next: (res: Model<Data>) => {
        this.videos = res.data.videos;
        console.log(this.videos);
        
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        const result = this.utilsService.parseResponse(error);
        this.utilsService.show(result.type, result.message);
        this.isLoading = false;
      }
    })
  }

}
