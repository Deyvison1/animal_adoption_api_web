import { Menu } from 'primeng/menu';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';

import { MenuItem } from 'primeng/api';
import { HeaderComponent } from '../header/header.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { KeycloakService } from '../../core/services/keycloak.service';
import { environment } from '../../../environments/environment';
import { MenuDTO } from '../../shared/model/menu.dto';
import { MenuService } from '../../core/services/menu.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    PanelMenuModule,
    HeaderComponent,
    RouterOutlet,
    DrawerModule,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  private readonly menuService: MenuService = inject(MenuService);
  private readonly keycloakService: KeycloakService = inject(KeycloakService);
  private readonly router: Router = inject(Router);
  @ViewChild('profileMenu') profileMenu: Menu;
  sidebarVisible: boolean = false;
  logoPath = 'assets/logo.png';
  menuItems: MenuDTO[] = [];
  private readonly roles: string[] = ['ADMIN'];

  ngOnInit(): void {
    this.menuService.findAll().subscribe({
      next: (resp: MenuDTO[]) => {
        this.menuItems = this.filterMenuByRoles(resp);

        // >>> Expande o item da rota atual ao carregar ou recarregar a página
        setTimeout(() => this.expandActiveRoute(), 0);
      },
    });

    // Mantém expansão ao navegar pelo app
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.expandActiveRoute();
      });
  }

  private expandItems(items: MenuDTO[], currentUrl: string): boolean {
    let match = false;

    items.forEach((item) => {
      if (item.items && item.items.length > 0) {
        const childMatch = this.expandItems(item.items, currentUrl);
        item.expanded = childMatch;

        if (childMatch) match = true;
      }

      if (item.routerLink && currentUrl.startsWith(item.routerLink)) {
        match = true;
      }
    });

    return match;
  }

  private initMenu() {
    this.menuService.findAll().subscribe({
      next: (resp: MenuDTO[]) => {
        this.menuItems = this.filterMenuByRoles(resp);
      },
    });
  }

  private expandRecursively(item: MenuDTO, currentUrl: string): boolean {
    let isMatch = item.routerLink && currentUrl.startsWith(item.routerLink);

    if (item.items && item.items.length > 0) {
      const anyChildMatch = item.items
        .map((child) => this.expandRecursively(child, currentUrl))
        .some((match) => match);

      item.expanded = anyChildMatch;
      return anyChildMatch || isMatch;
    }

    return isMatch;
  }
  private filterMenuByRoles(menu: MenuDTO[]): MenuDTO[] {
    return menu
      .map((item) => {
        const filteredItems = item.items
          ? this.filterMenuByRoles(item.items)
          : [];

        const hasRole =
          !item.roles || item.roles.length === 0
            ? true
            : this.keycloakService.hasAnyRole(item.roles);

        if (hasRole || filteredItems.length > 0) {
          return {
            ...item,
            items: filteredItems,
          };
        }
        return null;
      })
      .filter((x): x is MenuDTO => x !== null);
  }
  private expandActiveRoute() {
    const currentUrl = this.router.url;

    this.menuItems.forEach((item) => this.expandItem(item, currentUrl));

    // ✅ ISSO É O QUE ESTAVA FALTANDO
    this.menuItems = [...this.menuItems];
  }

  private expandItem(item: MenuDTO, currentUrl: string): boolean {
    const match = item.routerLink && currentUrl.startsWith(item.routerLink);

    if (item.items && item.items.length > 0) {
      const hasActiveChild = item.items
        .map((sub) => this.expandItem(sub, currentUrl))
        .some((active) => active);

      item.expanded = hasActiveChild || match;
      return item.expanded;
    }

    return match;
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
