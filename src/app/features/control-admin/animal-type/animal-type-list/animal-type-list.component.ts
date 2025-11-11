import { Component, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from '../../../../core/services/toastr.service';
import { Router } from '@angular/router';
import { pageConfig } from '../../../../core/constants/page-config.constants';
import { operationMessages } from '../../../../core/constants/operation-messages.constants';
import { AnimalTypeDTO } from '../../../../shared/model/animal-type.dto';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';

import { FormsModule } from '@angular/forms';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { getPagePrimeng } from '../../../../shared/utils/page-primeng.utils';
import { AnimalTypeService } from '../../../../core/services/animal-type.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthRoleDirective } from '../../../../shared/directives/auth-role.directive';

@Component({
  selector: 'app-animal-type-list',
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
    AuthRoleDirective,
  ],
  templateUrl: './animal-type-list.component.html',
  styleUrl: './animal-type-list.component.scss',
})
export class AnimalTypeListComponent {
  private readonly confirmationService: ConfirmationService =
    inject(ConfirmationService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly animalTypeService: AnimalTypeService =
    inject(AnimalTypeService);
  readonly rolesAdmin: string[] = ['ADMIN'];

  pageConfig = pageConfig;
  operationMessages = operationMessages;
  animalsType: AnimalTypeDTO[] = [];
  totalRecords = 0;
  showTable: boolean = false;

  loadData(event: TableLazyLoadEvent) {
    this.pageConfig = getPagePrimeng(event, this.pageConfig.filters);
    this.animalTypeService.findAll(this.pageConfig).subscribe({
      next: (resp) => {
        this.animalsType = resp.content;
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
      header: 'Tem certeza que deseja excluir esse tipo?',
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
    this.animalTypeService.delete(id).subscribe({
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

  navigationToEdit(id: string) {
    this.router.navigate(['admin/animal-type', 'form', id]);
  }
}
