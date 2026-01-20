import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ErroComponent } from '../erro/erro.component';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-modal-motivo-not-published',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    InputTextModule,
    FloatLabel,
    ErroComponent,
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
  ],
  templateUrl: './modal-motivo-not-published.component.html',
})
export class ModalMotivoNotPublishedComponent {
  visible: boolean = false;
  motivoForm = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(255),
  ]);
  despublicaAnimal = output<string>();

  open() {
    this.visible = !this.visible;
  }

  despublicarAnimal() {
    if (this.motivoForm.invalid) return;

    const motivo = this.motivoForm.value;
    this.despublicaAnimal.emit(motivo);
  }
}
