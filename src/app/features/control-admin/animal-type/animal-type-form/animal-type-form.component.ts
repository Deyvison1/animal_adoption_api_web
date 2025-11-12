import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Card } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { ErroComponent } from '../../../../shared/components/erro/erro.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AnimalTypeService } from '../../../../core/services/animal-type.service';
import { AnimalTypeDTO } from '../../../../shared/model/animal-type.dto';
import { ToastrService } from '../../../../core/services/toastr.service';
import { operationMessages } from '../../../../core/constants/operation-messages.constants';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-animal-type-form',
  standalone: true,
  imports: [
    Card,
    FloatLabel,
    CommonModule,
    FormsModule,
    ErroComponent,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './animal-type-form.component.html',
  styleUrl: './animal-type-form.component.scss',
})
export class AnimalTypeFormComponent implements OnInit {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly animalTypeService: AnimalTypeService =
    inject(AnimalTypeService);
  private readonly toastrService: ToastrService = inject(ToastrService);
  private readonly route = inject(ActivatedRoute);

  private readonly operationMessages = operationMessages;
  id: string;

  form: FormGroup;
  title: string = 'Cadastrar tipo';
  isViewMode: boolean = false;

  ngOnInit(): void {
    this.initForm();
    this.checkIfUpdate();
  }

  save() {
    const dto: AnimalTypeDTO = this.form.value;
    if (this.id) {
      this.update(dto);
    } else {
      this.add(dto);
    }
  }

  private add(dto: AnimalTypeDTO) {
    this.animalTypeService.add(dto).subscribe({
      next: (resp: AnimalTypeDTO) => {
        this.toastrService.showSucess(
          this.operationMessages.SUCCESS,
          'Tipo adicionado com sucesso.'
        );
      },
      error: (err) => {
        this.toastrService.showErro(this.operationMessages.ERRO, 'Erro');
      },
    });
  }

  private update(dto: AnimalTypeDTO) {
    this.animalTypeService.update(this.id, dto).subscribe({
      next: (resp: AnimalTypeDTO) => {
        this.toastrService.showSucess(
          this.operationMessages.SUCCESS,
          'Tipo atualizado com sucesso.'
        );
      },
      error: (err) => {
        this.toastrService.showErro(this.operationMessages.ERRO, 'Erro');
      },
    });
  }

  private initForm() {
    this.form = this.fb.group({
      id: [],
      name: [null, [Validators.required]],
    });
  }

  private findById(id: string) {
    this.animalTypeService.findById(id).subscribe({
      next: (resp: AnimalTypeDTO) => {
        this.form.patchValue(resp);
      },
      error: (err) => {},
    });
  }

  private checkIfUpdate(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';

    this.title = this.id ? 'Atualizar tipo' : 'Cadastrar tipo';

    if (this.id) {
      this.findById(this.id);
    } else {
      this.form.reset();
    }

    this.isViewMode = this.route.snapshot.url.some(
      (segment) => segment.path === 'view'
    );

    if (this.isViewMode) {
      this.form.disable();
    }
  }
}
