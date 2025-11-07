import { Component } from '@angular/core';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { Toast } from 'primeng/toast';
import { FooterComponent } from './layout/footer/footer.component';
import { NavComponent } from './layout/nav/nav.component';

@Component({
  selector: 'app-root',
  imports: [NavComponent, FooterComponent, Toast, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'animal-adoption-web';
}
