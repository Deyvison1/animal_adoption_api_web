import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from '../../../../core/services/toastr.service';
import { Router } from '@angular/router';
import { pageConfig } from '../../../../core/constants/page-config.constants';
import { operationMessages } from '../../../../core/constants/operation-messages.constants';
import { BreedDTO } from '../../../../shared/model/breed.dto';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { getPagePrimeng } from '../../../../shared/utils/page-primeng.utils';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { BreedService } from '../../../../core/services/breed.service';
import { AuthRoleDirective } from '../../../../shared/directives/auth-role.directive';

@Component({
  selector: 'app-breed-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ToastModule,
    ConfirmDialog,
    CardModule,
    ButtonGroupModule,
    AuthRoleDirective
  ],
  templateUrl: './breed-list.component.html',
  styleUrl: './breed-list.component.scss',
})
export class BreedListComponent {
  private readonly confirmationService: ConfirmationService =
    inject(ConfirmationService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly breedService: BreedService = inject(BreedService);
  readonly rolesAdmin: string[] = ['ADMIN'];

  pageConfig = pageConfig;
  operationMessages = operationMessages;
  breeds: BreedDTO[] = [];
  totalRecords = 0;
  showTable: boolean = false;

  loadData(event: TableLazyLoadEvent) {
    this.pageConfig = getPagePrimeng(event, this.pageConfig.filters);
    this.breedService.findAll(this.pageConfig).subscribe({
      next: (resp) => {
        this.breeds = resp.content;
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

  confirm(id: string, name: string) {
    const nameBold = `<strong>${name}</strong>`;
    this.confirmationService.confirm({
      message: `A exclusão do ${nameBold} não poderá ser desfeita.`,
      header: 'Tem certeza que deseja excluir essa raça?',
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

  private delete(id: string) {
    this.breedService.delete(id).subscribe({
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

  navigationToView(id: string) {
    this.router.navigate(['admin/breed', 'form', id, 'view']);
  }

  navigationToEdit(id: string) {
    this.router.navigate(['admin/breed', 'form', id]);
  }
}
