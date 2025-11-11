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

@Component({
  selector: 'app-dog-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabel,
    ButtonModule,
  ],
  templateUrl: './dog-filter.component.html',
  styleUrl: './dog-filter.component.scss',
})
export class DogFilterComponent implements OnInit {
  private readonly fb: FormBuilder = inject(FormBuilder);

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
    });
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
