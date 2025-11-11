import { AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  // Remove tudo que não é número
  const digits = value.replace(/\D/g, '');

  // Telefone válido: 10 ou 11 dígitos
  if (digits.length === 10 || digits.length === 11) {
    return null;
  }

  return { invalidPhone: true };
}
