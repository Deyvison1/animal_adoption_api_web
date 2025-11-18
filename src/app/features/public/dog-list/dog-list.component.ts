import { Component, inject, OnInit } from '@angular/core';
import { DogDTO } from '../../../shared/model/dog.dto';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';
import { PublicService } from '../../../core/services/public.service';
import { PageConfigDTO } from '../../../shared/model/page/page-config.dto';
import { pageConfig } from '../../../core/constants/page-config.constants';
import { GalleriaModule } from 'primeng/galleria';
import { ContactViewComponent } from '../contact-view/contact-view.component';
import { DogFilterComponent } from '../../../shared/components/dog-filter/dog-filter.component';
import { DogFilterDTO } from '../../../shared/model/dog-filter.dto';
import { ToastrService } from '../../../core/services/toastr.service';

@Component({
  selector: 'app-dog-list',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    CarouselModule,
    ImageModule,
    GalleriaModule,
    ContactViewComponent,
    DogFilterComponent,
  ],
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.scss'],
})
export class DogListComponent implements OnInit {
  private readonly publicService: PublicService = inject(PublicService);
  private readonly toastrService: ToastrService = inject(ToastrService);
  dogs: DogDTO[] = [];
  pageConfig: PageConfigDTO<any> = pageConfig;
  loading = true;
  allLoaded = false;

  ngOnInit(): void {
    this.loadDogs();
  }

  search(filter: DogFilterDTO) {
    this.pageConfig.filters = filter;
    this.pageConfig.page = 0;
    this.dogs = [];
    this.allLoaded = false;
    this.loadDogs();
  }

  onScroll(event: any) {
    const element = event.target;

    // scroll chegou no final, só dispara se não estiver carregando e ainda houver registros
    if (
      element.scrollTop + element.clientHeight >= element.scrollHeight - 5 &&
      !this.loading &&
      !this.allLoaded
    ) {
      this.pageConfig.page++;
      this.loadDogs();
    }
  }

  clear() {
    this.pageConfig.filters = {};
    this.pageConfig.page = 0;
    this.dogs = [];
    this.allLoaded = false;
    this.loadDogs();
  }

  loadDogs() {
    this.loading = true;
    this.publicService.findAllDogs(this.pageConfig).subscribe({
      next: (newDogs) => {
        if (newDogs.content.length === 0) {
          this.allLoaded = true;
        } else {
          this.dogs = [...this.dogs, ...newDogs.content];
        }
      },
      error: (err) => this.toastrService.showErro('Erro', 'Falha ao buscar dados.'),
      complete: () => {
        this.loading = false;
      },
    });
  }
}
