import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { CardModule } from 'primeng/card';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToastrService } from '../../../../core/services/toastr.service';
import { Router } from '@angular/router';
import { DogService } from '../../../../core/services/dog.service';
import { pageConfig } from '../../../../core/constants/page-config.constants';
import { operationMessages } from '../../../../core/constants/operation-messages.constants';
import { DogDTO } from '../../../../shared/model/dog.dto';
import { getPagePrimeng } from '../../../../shared/utils/page-primeng.utils';
import { HttpErrorResponse } from '@angular/common/http';
import { ImageModule } from 'primeng/image';
import { TooltipModule } from 'primeng/tooltip';
import { AuthRoleDirective } from '../../../../shared/directives/auth-role.directive';
import { DogFilterComponent } from '../../../../shared/components/dog-filter/dog-filter.component';
import { DogFilterDTO } from '../../../../shared/model/dog-filter.dto';

@Component({
  selector: 'app-dog-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ToastModule,
    ConfirmDialog,
    CardModule,
    ButtonGroupModule,
    ImageModule,
    TooltipModule,
    AuthRoleDirective,
    DogFilterComponent,
  ],
  templateUrl: './dog-list.component.html',
  styleUrl: './dog-list.component.scss',
})
export class DogListComponent {
  private readonly confirmationService: ConfirmationService =
    inject(ConfirmationService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly dogService: DogService = inject(DogService);
  readonly rolesAdmin: string[] = ['ADMIN'];
  readonly rolesAdminRead: string[] = ['ADMIN', 'ADMIN_READ'];

  pageConfig = pageConfig;
  operationMessages = operationMessages;
  dogs: DogDTO[] = [];
  totalRecords = 0;
  showTable: boolean = false;

  loadData(event: TableLazyLoadEvent) {
    this.pageConfig = getPagePrimeng(event, this.pageConfig.filters);
    this.dogService.findAll(this.pageConfig).subscribe({
      next: (resp) => {
        this.dogs = resp.content;
        this.totalRecords = resp.totalElements;
      },
      error: (err: Error) => {
        this.toastrService.showErro(
          operationMessages.ERRO,
          'Falha ao buscar dados.'
        );
      },
    });
  }

  clear() {
    this.pageConfig.filters = {};
    this.pageConfig.page = 0;
    this.dogs = [];
    this.loadData({
      first: 0,
      rows: this.pageConfig.size,
    });
  }

  confirm(id: string, name: string) {
    const nameBold = `<strong>${name}</strong>`;
    this.confirmationService.confirm({
      message: `A exclusão do ${nameBold} não poderá ser desfeita.`,
      header: 'Tem certeza que deseja excluir esse cachorro?',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Excluir',
        severity: 'danger',
      },
      accept: () => {
        this.delete(id);
      },
    });
  }

  search(filter: DogFilterDTO) {
    this.pageConfig.filters = filter;
    const page = Math.floor(this.pageConfig.page / this.pageConfig.size);
    this.loadData({ first: page, rows: pageConfig.size });
  }

  getUriImage(dog: DogDTO) {
    if (dog.images?.length) {
      return `data:${dog.images[0].contentType};base64,${dog.images[0].data}`;
    }
    return '';
  }

  private delete(id: string) {
    this.dogService.delete(id).subscribe({
      next: () => {
        this.toastrService.showSucess(
          this.operationMessages.SUCCESS,
          'Tipo deletado com sucesso'
        );
        this.loadData(this.pageConfig);
      },
      error: (err: HttpErrorResponse) => {
        this.toastrService.showErro(
          this.operationMessages.ERRO,
          err.error.message
        );
      },
    });
  }

  getContactsName(dog: DogDTO) {
    return dog.contacts.map((x) => x.name).join(', ');
  }

  navigationToView(id: string) {
    this.router.navigate(['admin/dog', 'form', id, 'view']);
  }

  navigationToEdit(id: string) {
    this.router.navigate(['admin/dog', 'form', id]);
  }
}
