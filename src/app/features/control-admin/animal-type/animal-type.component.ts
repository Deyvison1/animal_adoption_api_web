import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-animal-type',
  standalone: true,
  imports: [CardModule, RouterOutlet],
  templateUrl: './animal-type.component.html',
  styleUrl: './animal-type.component.scss'
})
export class AnimalTypeComponent {

}
