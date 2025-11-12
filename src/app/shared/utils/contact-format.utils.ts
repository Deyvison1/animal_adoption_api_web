import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContactFormatService {
  format(value: string | null | undefined): string {
    if (!value) return '';

    const rawValue = value.trim();
    const isEmail = /[a-zA-Z@]/.test(rawValue);

    if (isEmail) return rawValue;

    const numbers = rawValue.replaceAll(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 6)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(
        6
      )}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
      7,
      11
    )}`;
  }
}

@Pipe({
  name: 'contactFormat',
  standalone: true,
})
export class ContactFormatPipe implements PipeTransform {
  private readonly formatter: ContactFormatService = new ContactFormatService();
  transform(value: string | null | undefined): string {
    return this.formatter.format(value);
  }
}
