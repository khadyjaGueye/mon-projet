import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { SectionServiceComponent } from "../../components/section-service/section-service.component";
import { HoraireComponent } from "../../components/horaire/horaire.component";
import { ContactComponent } from "../../components/contact/contact.component";
import { AddressComponent } from "../../components/address/address.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Data, Model, Video } from '../../core/interface/model';
import { ServiceService } from '../../core/services/service.service';
import { environment } from '../../../environments/environment';
import { UtilsService } from '../../core/services/utils.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HeaderComponent, SectionServiceComponent, HoraireComponent, ContactComponent, AddressComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  videos: Video[] = [];

  constructor(private service: ServiceService, private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.getVideo();
  }

  getVideo() {
    this.service.url = environment.apiUrlNode + "videos";
    this.service.all().subscribe({
      next: (res: Model<Data>) => {
        this.videos = res.data.videos;
        console.log(this.videos);
        
      },
      error: (error: HttpErrorResponse) => {
        const result = this.utilsService.parseResponse(error);
        this.utilsService.show(result.type, result.message);
      }
    })
  }

}
