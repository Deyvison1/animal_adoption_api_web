import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-layout-admin',
  imports: [NavComponent, FooterComponent, LoadingComponent, Toast],
  templateUrl: './layout-admin.component.html',
  styleUrl: './layout-admin.component.scss',
})
export class LayoutAdminComponent {}
