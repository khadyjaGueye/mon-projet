import { Component } from '@angular/core';
import { HORAIRES } from '../../app.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horaire',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horaire.component.html',
  styleUrl: './horaire.component.css'
})
export class HoraireComponent {
horaires = HORAIRES;
}
