import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';
import { KeycloakService } from '../../core/services/keycloak.service';

@Directive({
  selector: '[appAuthRole]',
})
export class AuthRoleDirective implements OnInit {
  private readonly keycloakService = inject(KeycloakService);
  private readonly el = inject(ElementRef);
  @Input({ required: true }) appAuthRole!: string[];

  ngOnInit(): void {
    this.hideElement();
  }

  hideElement() {
    if (!this.hasAnyRealmRole()) {
      this.el.nativeElement.style.display = 'none';
      this.el.nativeElement.remove();
    }
  }

  hasAnyRealmRole(): boolean {
    return this.keycloakService.hasAnyRole(this.appAuthRole);
  }
}
