import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoComponent } from "../video/video.component";
import { HoraireComponent } from "../horaire/horaire.component";
import { ServiceComponent } from "../service/service.component";

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, VideoComponent, HoraireComponent, ServiceComponent],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent implements OnInit{

  display: string = 'dashbord';
  sidebarOpen: boolean = false;

  constructor(){}

  ngOnInit(): void {
    
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  displayService(): void {
    this.display = 'service';
    this.sidebarOpen =  false;
  }

  displayVideo():void{
    this.display = 'video';
    this.sidebarOpen =  false;
  }

  displayHoraire():void{
    this.display = 'horaire';
    this.sidebarOpen =  false;
  }

}
