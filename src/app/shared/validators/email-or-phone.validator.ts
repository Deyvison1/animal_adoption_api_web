import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { phoneValidator } from './phone.validator';

export function emailOrPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    
    const value = control.value;
    if (!value) return null;

    // Se tiver letra, valida como email
    if (/[a-zA-Z]/.test(value)) {
      return Validators.email(control);
    }

    // Se só números, valida como telefone
    return phoneValidator(control);
  };
}
