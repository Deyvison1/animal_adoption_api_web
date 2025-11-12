import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DogFilterDTO } from '../../model/dog-filter.dto';
import { InputNumberModule } from 'primeng/inputnumber';
import { ErroComponent } from '../erro/erro.component';
import {
  ContactFormatPipe,
  ContactFormatService,
} from '../../utils/contact-format.utils';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { emailOrPhoneValidator } from '../../validators/email-or-phone.validator';

@Component({
  selector: 'app-dog-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabel,
    InputNumberModule,
    ButtonModule,
    ErroComponent,
  ],
  templateUrl: './dog-filter.component.html',
  styleUrl: './dog-filter.component.scss',
  animations: [
    trigger('expandCollapse', [
      state('open', style({ height: '*', opacity: 1, overflow: 'hidden' })),
      state('closed', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      transition('open <=> closed', animate('250ms ease-in-out')),
    ]),
  ],
})
export class DogFilterComponent implements OnInit {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly contactFormatService = inject(ContactFormatService);
  expanded = false;

  form: FormGroup;

  searchEvent = output<DogFilterDTO>();
  clearEvent = output<void>();

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [''],
      breed: [''],
      age: [null],
      valueContact: ['', [emailOrPhoneValidator()]],
      nameContact: [''],
    });
  }

  toggle() {
    this.expanded = !this.expanded;
  }


  onValueInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const formatted = this.contactFormatService.format(input.value);
    this.form.get('valueContact')?.setValue(formatted);

  }

  clear(): void {
    this.form.reset();
    this.clearEvent.emit();
  }

  search(): void {
    const filterValues: DogFilterDTO = this.form.value;
    filterValues.name = filterValues.name?.trim();
    filterValues.breed = filterValues.breed?.trim();
    this.searchEvent.emit(filterValues);
  }
}
