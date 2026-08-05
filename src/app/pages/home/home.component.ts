import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { SectionServiceComponent } from "../../components/section-service/section-service.component";
import { HoraireComponent } from "../../components/horaire/horaire.component";
import { ContactComponent } from "../../components/contact/contact.component";
import { AddressComponent } from "../../components/address/address.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SectionServiceComponent, HoraireComponent, ContactComponent, AddressComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
