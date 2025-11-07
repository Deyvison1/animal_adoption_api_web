import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-breed',
  standalone: true,
  imports: [CardModule, RouterOutlet],
  templateUrl: './breed.component.html',
  styleUrl: './breed.component.scss',
})
export class BreedComponent {}
