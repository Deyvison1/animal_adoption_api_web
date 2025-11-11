import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-layout-public',
  standalone: true,
  imports: [
    RouterOutlet,
    NavComponent,
    FooterComponent,
    LoadingComponent,
    Toast
  ],
  templateUrl: './layout-public.component.html',
  styleUrl: './layout-public.component.scss',
})
export class LayoutPublicComponent {}
