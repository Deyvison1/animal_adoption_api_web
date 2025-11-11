import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { QRCodeComponent } from 'angularx-qrcode';
import { ContactDTO } from '../../../shared/model/contact.dto';
import { Button } from 'primeng/button';
import { ToastrService } from '../../../core/services/toastr.service';
import { operationMessages } from '../../../core/constants/operation-messages.constants';

@Component({
  selector: 'app-contact-view',
  standalone: true,
  imports: [DialogModule, QRCodeComponent, CommonModule, Button],
  templateUrl: './contact-view.component.html',
  styleUrl: './contact-view.component.scss',
})
export class ContactViewComponent {
  private readonly toastrService: ToastrService = inject(ToastrService);
  visible = false;
  messages = operationMessages;
  contacts = input<ContactDTO[]>(); // recebe lista de contatos

  open(contacts: ContactDTO[]) {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  copyText(value: string) {
    navigator.clipboard.writeText(value).then(() => {
      this.toastrService.showInfo(this.messages.SUCCESS, 'Texto copiado!');
    });
  }

  getWhatsappLink(value: string): string {
    // Remove tudo que não for número
    const phone = value.replaceAll(/\D/g, '');
    return `https://wa.me/${phone}`;
  }
}
