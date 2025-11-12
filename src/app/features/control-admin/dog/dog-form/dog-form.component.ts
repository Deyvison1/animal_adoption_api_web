import { BreedService } from './../../../../core/services/breed.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormArray,
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
import { DogService } from '../../../../core/services/dog.service';
import { ToastrService } from '../../../../core/services/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { operationMessages } from '../../../../core/constants/operation-messages.constants';
import { DogDTO } from '../../../../shared/model/dog.dto';
import { DogCreateDTO } from '../../../../shared/model/dog-create.dto';
import { SelectModule } from 'primeng/select';
import { AnimalTypeDTO } from '../../../../shared/model/animal-type.dto';
import { BreedDTO } from '../../../../shared/model/breed.dto';
import { AnimalTypeService } from '../../../../core/services/animal-type.service';
import { PageDTO } from '../../../../shared/model/page/page.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { DogUpdateDTO } from '../../../../shared/model/dog-update.dto';
import { GalleriaModule } from 'primeng/galleria';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { BaseImageDTO } from '../../../../shared/model/base/base-image.dto';
import { AnimalImageDTO } from '../../../../shared/model/animal-image.dto';
import { AnimalImageService } from '../../../../core/services/animal-image.service';
import { converter } from '../../../../shared/utils/image-converter.util';
import { TextareaModule } from 'primeng/textarea';
import { ContactComponent } from '../contact/contact.component';
import { emailOrPhoneValidator } from '../../../../shared/validators/email-or-phone.validator';
import { AuthRoleDirective } from '../../../../shared/directives/auth-role.directive';

@Component({
  selector: 'app-dog-form',
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
    CheckboxModule,
    InputNumberModule,
    FileUploadModule,
    GalleriaModule,
    TextareaModule,
    ContactComponent,
    AuthRoleDirective
  ],
  templateUrl: './dog-form.component.html',
  styleUrl: './dog-form.component.scss',
})
export class DogFormComponent implements OnInit {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly dogService: DogService = inject(DogService);
  private readonly animalTypeService: AnimalTypeService =
    inject(AnimalTypeService);
  private readonly breedService: BreedService = inject(BreedService);
  private readonly toastrService: ToastrService = inject(ToastrService);
  private readonly animalImageService: AnimalImageService =
    inject(AnimalImageService);
  private readonly route = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  readonly rolesAdmin: string[] = ['ADMIN'];

  private readonly operationMessages = operationMessages;
  id: string;
  types: AnimalTypeDTO[] = [];
  breeds: BreedDTO[] = [];
  images = signal<BaseImageDTO[]>([]);
  dogSelected: DogDTO;
  activeIndex = signal(0);
  isViewMode: boolean = false;

  form: FormGroup;
  title: string = 'Cadastrar cachorro';

  responsiveOptions = [
    { breakpoint: '1300px', numVisible: 4 },
    { breakpoint: '575px', numVisible: 1 },
  ];

  get imagesArray(): any[] {
    return this.images();
  }

  ngOnInit(): void {
    this.getBreedsAndTypes();
    this.initForm();
    this.checkIfUpdate();
  }

  save() {
    const dto = this.form.value;
    if (this.id) {
      this.update(dto);
    } else {
      this.add(dto);
    }
  }

  getBreedsAndTypes() {
    this.findAllBreeds();
    this.findAllTypes();
  }

  private findAllTypes() {
    this.animalTypeService.findAll({ page: 0, size: 20 }).subscribe({
      next: (resp: PageDTO<AnimalTypeDTO[]>) => {
        this.types = resp.content;
      },
      error: (err: HttpErrorResponse) => {
        this.toastrService.showErro(this.operationMessages.ERRO, 'Erro');
      },
    });
  }

  private findAllBreeds() {
    this.breedService.findAll({ page: 0, size: 20 }).subscribe({
      next: (resp: PageDTO<BreedDTO[]>) => {
        this.breeds = resp.content;
      },
      error: (err: HttpErrorResponse) => {
        this.toastrService.showErro(this.operationMessages.ERRO, 'Erro');
      },
    });
  }

  private add(dto: DogCreateDTO) {
    this.dogService.add(dto).subscribe({
      next: (resp: DogDTO) => {
        this.toastrService.showSucess(
          this.operationMessages.SUCCESS,
          'Tipo adicionado com sucesso.'
        );
        this.navigationToEdit(resp.id);
      },
      error: (err) => {
        this.toastrService.showErro(this.operationMessages.ERRO, 'Erro');
      },
    });
  }

  private navigationToEdit(id: string) {
    this.router.navigate(['admin/dog', 'form', id]);
  }

  private update(dto: DogUpdateDTO) {
    this.dogService.update(this.id, dto).subscribe({
      next: (resp: DogDTO) => {
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
      age: [0, [Validators.required]],
      breedId: [null, [Validators.required]],
      available: [],
      description: [],
      images: this.fb.array([]),
      contacts: this.fb.array([]),
      activeImage: [''],
    });
  }

  private loadImages(images: AnimalImageDTO[]): void {
    const mapped = converter<AnimalImageDTO>(images);

    this.images.set(mapped);

    const active = mapped.find((img) => img.active);
    if (active) this.form.patchValue({ activeImage: active.filename });
  }
  private findById(id: string) {
    this.dogService.findById(id).subscribe({
      next: (resp: DogDTO) => {
        this.dogSelected = resp;
        this.loadImages(resp.images);

        // Preenche os campos simples
        this.form.patchValue({
          id: resp.id,
          name: resp.name,
          age: resp.age,
          breedId: resp.breed.id,
          available: resp.available,
          description: resp.description,
        });

        // Preenche o FormArray de contatos
        const contactsArray = this.form.get('contacts') as FormArray;
        contactsArray.clear(); // limpa contatos antigos

        resp.contacts?.forEach((contact) => {
          contactsArray.push(
            this.fb.group({
              id: [{ value: contact.id || null, disabled: this.isViewMode }],
              name: [{ value: contact.name || '', disabled: this.isViewMode }, [Validators.required]],
              value: [
                { value: contact.value || '', disabled: this.isViewMode },
                [Validators.required, emailOrPhoneValidator()],
              ],
            })
          );
        });
      },
      error: (err) => {
        this.toastrService.showErro(this.operationMessages.ERRO, 'Erro');
      },
    });
  }

  private checkIfUpdate(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.title = this.id ? 'Atualizar cachorro' : 'Cadastrar cachorro';

    if (this.id) {
      this.findById(this.id);
    } else {
      this.form.reset();
      this.form.patchValue({
        available: true,
      });
    }
     this.isViewMode = this.route.snapshot.url.some(
      (segment) => segment.path === 'view'
    );

    if (this.isViewMode) {
      this.title = 'Visualizar cachorro';
      this.form.disable();
    }
  }

  setActiveImage(item: AnimalImageDTO): void {
    this.images.update((imgs) =>
      imgs.map((img) => ({ ...img, active: img.filename === item.filename }))
    );
    this.form.patchValue({ activeImage: item.filename });
    this.activateImage(item.id);
  }

  private activateImage(id: string): void {
    this.animalImageService.activateImage(id).subscribe({
      next: () =>
        this.toastrService.showSucess(
          this.operationMessages.SUCCESS,
          'A imagem foi definida como ativa.'
        ),
      error: (err) =>
        this.toastrService.showErro(
          this.operationMessages.ERRO,
          err.error?.message
        ),
    });
  }

  removeImage(item: AnimalImageDTO): void {
    if (item.active) {
      this.toastrService.showWarn(
        this.operationMessages.ERRO,
        'Não é possível excluir a imagem ativa.'
      );
      return;
    }

    this.animalImageService.remove(item.id).subscribe({
      next: () => {
        this.images.update((imgs) => {
          const filtered = imgs.filter((img) => img?.id !== item?.id);

          const hadActiveRemoved = imgs.find(
            (img) => img.id === item.id
          )?.active;
          if (hadActiveRemoved && filtered.length > 0) {
            filtered[0] = { ...filtered[0], active: true };
          }

          this.activeIndex.set(filtered.findIndex((x) => x.active));
          return filtered;
        });
        this.toastrService.showSucess(
          this.operationMessages.SUCCESS,
          'Imagem removida.'
        );
      },
      error: (err) =>
        this.toastrService.showErro(
          this.operationMessages.ERRO,
          err.error?.message
        ),
    });
  }

  get contactsFormArray(): FormArray {
    return this.form.get('contacts') as FormArray;
  }

  private initImage(image: AnimalImageDTO): BaseImageDTO {
    return {
      id: image.id,
      filename: image.filename,
      title: image.filename,
      contentType: image.contentType,
      itemImageSrc: `data:${image.contentType};base64,${image.data}`,
      thumbnailImageSrc: `data:${image.contentType};base64,${image.data}`,
      active: image.active,
    };
  }

  onFileSelected(event: FileSelectEvent): void {
    const file = event.currentFiles[0];
    const animalId = this.form.get('id')?.value;
    if (!file || !animalId) return;
    this.animalImageService.uploadImage(animalId, file, false).subscribe({
      next: (resp: AnimalImageDTO) => {
        const newImage: BaseImageDTO = this.initImage(resp);

        this.images.update((imgs) => [...imgs, newImage]);
        if (newImage.active)
          this.form.patchValue({ activeImage: newImage.filename });

        this.toastrService.showSucess(
          this.operationMessages.SUCCESS,
          'Imagem enviada.'
        );
      },
      error: (err: HttpErrorResponse) => {
        this.toastrService.showErro(
          this.operationMessages.ERRO,
          err.error.message
        );
      },
    });
  }
  
}
