import { Component, inject, OnInit, ViewChild } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Menubar } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { Button, ButtonModule } from "primeng/button";
import { Router } from "@angular/router";
import { Menu, MenuModule } from "primeng/menu";
import { KeycloakService } from '../../../core/services/keycloak.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    Menubar,
    ButtonModule,
    InputTextModule,
    CommonModule,
    Button,
    MenuModule,
],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  private readonly router: Router = inject(Router);
  private readonly keycloakService: KeycloakService = inject(KeycloakService);
  @ViewChild('profileMenu') profileMenu: Menu;
  items: MenuItem[] | undefined;
  profileItems: MenuItem[] = [];
  env = environment;

  ngOnInit() {
    this.initProfileMenu();
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

  isLoggedIn(): boolean {
    return this.keycloakService.isLoggedIn();
  }

  getNameProfile(): string {
    const profile = this.keycloakService.getUserProfile();
    return profile ? profile.firstName || profile.username : 'Usuário';
  }

  toggleProfileMenu(event: Event) {
    this.profileMenu.toggle(event);
  }

  redirectToLogin() {
    this.keycloakService.login();
  }

  private initProfileMenu() {
    this.profileItems = [
      {
        label: 'Minha Conta',
        icon: 'pi pi-user',
        command: () => {
          globalThis.location.href = this.env.keycloakConfig.urlAccount;
        },
      },
      { separator: true },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => {
          this.keycloakService.logout();
        },
      },
    ];
  }
}
