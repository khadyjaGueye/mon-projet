import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
 phone = '+221XXXXXXXXX';

  sendWhatsApp() {
    const message = 'Bonjour, je souhaite prendre un rendez-vous au spa';
    const url = `https://wa.me/${this.phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
}
