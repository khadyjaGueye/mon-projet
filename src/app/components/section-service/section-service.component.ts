import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-section-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-service.component.html',
  styleUrl: './section-service.component.css'
})
export class SectionServiceComponent {
  mot_passe_email_mo:string="Dakar2024";
  services = [
    {
      id: 1,
      name: 'Déplacement',
      price: 30000,
      duration: '60 min',
      description: 'Pedicure 10000, Manicure 5000,Soin du Visage 10000',
      image: 'assets/images/about-img.jpg'
    },
    {
      id: 2,
      name: 'Soin du Visage',
      price: 50000,
      duration: '45 min',
      description: 'Nettoyage et hydratation de la peau.',
      image: 'assets/images/soin-visage.jpg'
    },
    {
      id: 3,
      name: 'Manucure',
      price: 3000,
      duration: '20 min',
      description: 'Soins des mains et des ongles.',
      image: 'assets/images/img222.jpg'
    },
     {
      id: 3,
      name: 'Pidicure',
      price: 5000,
      duration: '45 min',
      description: 'Soins des pieds et des ongles.',
      image: 'assets/images/pedicure.jpg'
    },
     {
      id: 3,
      name: 'Coiffure',
      price: 1500,
      duration: '20 min',
      description: 'Soins des cheveux .',
      image: 'assets/images/homme1.png'
    },
     {
      id: 3,
      name: 'Lave cheuveux',
      price: 20000,
      duration: '20 min',
      description: 'Soins des cheveux .',
      image: 'assets/images/lave-cheveux.jpg'
    },
  ];

  sendWhatsApp(serviceName: string) {
    const phone = '+221784611310';
    const message = `Bonjour, je souhaite réserver le service: ${serviceName}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
}
