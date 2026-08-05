import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../core/services/service.service';
import { environment } from '../../../environments/environment';
import { Data, Model, Service } from '../../core/interface/model';
import { UtilsService } from '../../core/services/utils.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { log } from 'util';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit{

  isLoading:boolean =false;
  isSubmitting:boolean=false;
  services:Service[]=[];
  form:FormGroup;

  constructor(private service:ServiceService,private utilsSevice:UtilsService,private fb:FormBuilder){
    this.form = fb.group({
      name:[''],
      price:[''],
      description:[''],
      image:['']
    })
  }

  ngOnInit(): void {
    this.getService();
  }

  getService(){
    this.service.url = environment.apiUrlNode + "services";
    this.isLoading = true;
    this.service.all().subscribe(
      (res: Model<Data>) => {
        this.services = res.data.services;
       //console.log(this.services);
        
        // const result = this.utilsSevice.parseResponse(res);
        // this.utilsSevice.show(result.type, res.data.message);
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        const result = this.utilsSevice.parseResponse(error);
        this.utilsSevice.show(result.type, result.message);
        this.isLoading = false;
      }
    )
  }

  deleteService(id:number){}

  openModalService(id:number){}

  showService(id:number){}

  onSubmit(){}

  onFileSelected(event: any) {
    const file = event.target.files[0]; // objet File
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
    }
  }

  onEditFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
     // this.editSelectedFile = file;
      // Prévisualisation
      const reader = new FileReader();
      // reader.onload = () => {
      //   this.editPreviewUrl = reader.result;
      // };
      reader.readAsDataURL(file);
      // Mettre à jour le formGroup
     // this.editForm.patchValue({ image: file });
    }
  }
}
