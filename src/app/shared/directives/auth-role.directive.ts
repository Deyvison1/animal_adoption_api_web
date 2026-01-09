import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { KeycloakService } from '../../core/services/keycloak.service';

@Directive({
  selector: '[appAuthRole]',
})
export class AuthRoleDirective implements OnInit {
  private readonly keycloakService = inject(KeycloakService);
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  @Input({ required: true }) appAuthRole!: string[];

  ngOnInit(): void {
    this.applyVisibility();
  }

  private applyVisibility() {
    const allowed = this.keycloakService.hasAnyRole(this.appAuthRole);

    if (allowed) {
      this.renderer.removeStyle(this.el.nativeElement, 'display');
      return;
    }

    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
  }
}
