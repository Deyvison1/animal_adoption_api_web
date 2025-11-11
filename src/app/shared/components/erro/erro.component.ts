import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-erro',
  standalone: true,
  imports: [MessageModule],
  templateUrl: './erro.component.html',
  styleUrl: './erro.component.scss',
})
export class ErroComponent {
  @Input() control: AbstractControl | null = null;

  get errorMessages(): string[] {
    if (!this.control || !this.control.errors) return [];

    const errors = this.control.errors;
    const msgs: string[] = [];

    if (errors['required']) msgs.push('Campo obrigatório');
    if (errors['minlength'])
      msgs.push(`Mínimo ${errors['minlength'].requiredLength} caracteres`);
    if (errors['maxlength'])
      msgs.push(`Máximo ${errors['maxlength'].requiredLength} caracteres`);
    if (errors['email'] || errors['invalidEmail']) msgs.push('E-mail inválido');
    if (errors['notZero']) msgs.push('Valor não pode ser 0.');
    if (errors['notNegative']) msgs.push('Valor não pode ser negativo.');
    if (errors['invalidPhone']) msgs.push('Telefone inválido');

    return msgs;
  }
}
