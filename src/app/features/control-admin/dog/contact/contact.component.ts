import { Component, inject, input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ErroComponent } from '../../../../shared/components/erro/erro.component';
import { InputText } from 'primeng/inputtext';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { types } from '../../../../core/constants/contact-type.constants';
import { emailOrPhoneValidator } from '../../../../shared/validators/email-or-phone.validator';
import { MessageModule } from 'primeng/message';
import { ContactDTO } from '../../../../shared/model/contact.dto';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputText,
    MessageModule,
    ButtonModule,
    SelectModule,
    ErroComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  private readonly fb: FormBuilder = inject(FormBuilder);
  form = input<FormArray>();
  types = types;
  isEmail: boolean = false;

  get contacts(): FormArray<FormGroup> {
    return this.form();
  }

  ngOnInit(): void {
    this.addContact();
  }

  /**
   * Popula o FormArray com contatos do backend
   */
  loadContactsFromDto(contactsDto: ContactDTO[]) {
    // Limpa o FormArray existente
    this.contacts.clear();

    contactsDto.forEach((dto) => {
      const group = this.fb.group({
        id: [dto.id || null],
        name: [dto.name || '', [Validators.required]],
        value: [
          dto.value || '',
          [Validators.required, emailOrPhoneValidator()],
        ],
      });

      this.contacts.push(group);
    });
  }

  setType(event: SelectChangeEvent) {
    this.isEmail = event.value === 'EMAIL';
  }

  removeContact(index: number) {
    this.contacts.removeAt(index);
  }

  addContact() {
    this.contacts.push(
      this.fb.group({
        id: [],
        name: ['', [Validators.required]],
        value: ['', [Validators.required, emailOrPhoneValidator()]],
      })
    );
  }
  onValueInput(event: Event, item: FormGroup) {
    const input = event.target as HTMLInputElement;
    const control = item.get('value');
    const rawValue = input.value;

    // Detecta email (qualquer letra ou @)
    const isEmail = /[a-zA-Z@]/.test(rawValue);

    if (isEmail) {
      // Email: seta valor cru
      control.setValue(rawValue);
    } else {
      // Telefone: remove tudo que não é número
      let numbers = rawValue.replace(/\D/g, '');

      if (numbers.length === 0) {
        control.setValue('');
      } else if (numbers.length <= 2) {
        control.setValue(`(${numbers}`);
      } else if (numbers.length <= 6) {
        // telefone fixo parcial: (XX) XXXX
        control.setValue(`(${numbers.slice(0, 2)}) ${numbers.slice(2)}`);
      } else if (numbers.length <= 10) {
        // telefone fixo completo: (XX) XXXX-XXXX
        control.setValue(
          `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`
        );
      } else {
        // celular: (XX) XXXXX-XXXX
        control.setValue(
          `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
            7,
            11
          )}`
        );
      }
    }

    // força validação
    control.updateValueAndValidity();
  }
}
