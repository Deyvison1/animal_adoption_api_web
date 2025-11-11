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
import { BreedService } from '../../../../core/services/breed.service';
import { BreedDTO } from '../../../../shared/model/breed.dto';
import { ActivatedRoute } from '@angular/router';
import { operationMessages } from '../../../../core/constants/operation-messages.constants';
import { ToastrService } from '../../../../core/services/toastr.service';
import { AnimalTypeDTO } from '../../../../shared/model/animal-type.dto';
import { AnimalTypeService } from '../../../../core/services/animal-type.service';
import { PageDTO } from '../../../../shared/model/page/page.dto';
import { SelectModule } from 'primeng/select';


@Component({
  selector: 'app-breed-form',
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
    SelectModule,
  ],
  templateUrl: './breed-form.component.html',
  styleUrl: './breed-form.component.scss',
})
export class BreedFormComponent implements OnInit {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly breedService: BreedService = inject(BreedService);
  private readonly toastrService: ToastrService = inject(ToastrService);
  private readonly route = inject(ActivatedRoute);
  private readonly animalTypeService: AnimalTypeService =
    inject(AnimalTypeService);
  private readonly operationMessages = operationMessages;

  form: FormGroup;
  id: string;
  title: string = 'Cadastrar raça';
  types: AnimalTypeDTO[] = [];

  ngOnInit(): void {
    this.initForm();
    this.findAllAnimalType();
    this.checkIfUpdate();
  }

  private initForm() {
    this.form = this.fb.group({
      id: [],
      name: [null, [Validators.required]],
      nationality: [],
      type: [null, [Validators.required]],
    });
  }

  findAllAnimalType() {
    this.animalTypeService.findAll({ page: 0, size: 10 }).subscribe({
      next: (resp: PageDTO<AnimalTypeDTO[]>) => {
        this.types = resp.content;
      },
      error: (err) => {},
    });
  }

  save() {
    const dto: BreedDTO = this.form.value;
    if (this.id) {
      this.update(dto);
    } else {
      this.add(dto);
    }
  }

  private add(dto: BreedDTO) {
    this.breedService.add(dto).subscribe({
      next: (resp: BreedDTO) => {
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

  private update(dto: BreedDTO) {
    this.breedService.update(this.id, dto).subscribe({
      next: (resp: BreedDTO) => {
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

  private findById(id: string) {
    this.breedService.findById(id).subscribe({
      next: (resp: BreedDTO) => {
        this.form.patchValue(resp);
      },
      error: (err) => {},
    });
  }

  private checkIfUpdate(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.title = this.id ? 'Atualizar raça' : 'Cadastrar raça';

    if (this.id) {
      this.findById(this.id);
    } else {
      this.form.reset();
    }
  }

  compareById(a: any, b: any): boolean {
    return a?.id === b?.id;
  }
}
