import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-dog',
  standalone: true,
  imports: [CardModule, RouterOutlet],
  templateUrl: './dog.component.html',
  styleUrl: './dog.component.scss'
})
export class DogComponent {

}
