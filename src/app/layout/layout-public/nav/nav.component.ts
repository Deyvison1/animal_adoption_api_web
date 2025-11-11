import { Component, inject, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Menubar } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { Button, ButtonModule } from "primeng/button";
import { Router } from "@angular/router";
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    Menubar,
    ButtonModule,
    InputTextModule,
    CommonModule,
    Button,
],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  private readonly router: Router = inject(Router);
  items: MenuItem[] | undefined;
  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
         command: () => {
          this.redirectTo('/home');
        }
      },
      {
        label: 'Cachorros',
        icon: 'pi pi-list',
        command: () => {
          this.redirectTo('/dog');
        }
      },
      {
        label: 'Gatos',
        icon: 'pi pi-list',
      },
    ];
  }

  redirectTo(path: string) {
    this.router.navigateByUrl(path);
  }
}
