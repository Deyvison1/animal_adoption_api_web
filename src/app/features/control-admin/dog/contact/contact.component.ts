import { Component, inject, input, OnInit, output } from '@angular/core';
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
import {
  ContactFormatPipe,
  ContactFormatService,
} from '../../../../shared/utils/contact-format.utils';

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
  private readonly contactFormatService = inject(ContactFormatService);

  form = input<FormArray>();
  types = types;
  isEmail: boolean = false;
  isViewMode = input.required<boolean>();

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
    const isDisabled = this.isViewMode ? { disabled: true } : {};
    contactsDto.forEach((dto) => {
      const group = this.fb.group({
        id: [{ value: dto.id || null, ...isDisabled }],
        name: [{ value: dto.name || '', ...isDisabled }, [Validators.required]],
        value: [
          { value: dto.value || '', ...isDisabled },
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
    const isDisabled = this.isViewMode() ? { disabled: true } : {disabled: false};

    this.contacts.push(
      this.fb.group({
        id: [{ value: null, ...isDisabled }],
        name: [{ value: '', ...isDisabled }, [Validators.required]],
        value: [
          { value: '', ...isDisabled },
          [Validators.required, emailOrPhoneValidator()],
        ],
      })
    );
  }
  onValueInput(event: Event, item: FormGroup) {
    const input = event.target as HTMLInputElement;
    const formatted = this.contactFormatService.format(input.value);
    item.get('value')?.setValue(formatted);
  }
}
