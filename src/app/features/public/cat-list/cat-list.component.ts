import { Component, inject, OnInit } from '@angular/core';
import { CatDTO } from '../../../shared/model/cat.dto';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';
import { PublicService } from '../../../core/services/public.service';
import { PageConfigDTO } from '../../../shared/model/page/page-config.dto';
import { GalleriaModule } from 'primeng/galleria';
import { ContactViewComponent } from '../contact-view/contact-view.component';
import { DogFilterComponent } from '../../../shared/components/dog-filter/dog-filter.component';
import { DogFilterDTO } from '../../../shared/model/dog-filter.dto';
import { ToastrService } from '../../../core/services/toastr.service';
import { STATUS_ANIMAL_META, StatusAnimal } from '../../../shared/model/status-animal.enum';
import { DEFAULT_PAGE_CONFIG } from '../../../core/constants';

@Component({
  selector: 'app-cat-list',
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
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.scss'],
})
export class CatListComponent implements OnInit {
  private readonly publicService: PublicService = inject(PublicService);
  private readonly toastrService: ToastrService = inject(ToastrService);
  cats: CatDTO[] = [];
  pageConfig: PageConfigDTO<any> = DEFAULT_PAGE_CONFIG;
  loading = true;
  allLoaded = false;
  StatusAnimal = StatusAnimal;

  ngOnInit(): void {
    this.loadCats();
  }

  search(filter: DogFilterDTO) {
    this.pageConfig.filters = filter;
    this.pageConfig.page = 0;
    this.cats = [];
    this.allLoaded = false;
    this.loadCats();
  }

  getCatImages(cat: CatDTO) {
    if (!cat.imagesComplet) return [];

    // separa ativa e não ativas
    const active = cat.imagesComplet.filter((img) => img.active);
    const others = cat.imagesComplet.filter((img) => !img.active);

    // retorna com a ativa primeiro
    return [...active, ...others];
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
      this.loadCats();
    }
  }

  clear() {
    this.pageConfig.filters = {};
    this.pageConfig.page = 0;
    this.cats = [];
    this.allLoaded = false;
    this.loadCats();
  }

  loadCats() {
    this.loading = true;
    this.publicService.findAllCats(this.pageConfig).subscribe({
      next: (newCats) => {
        if (newCats.content.length === 0) {
          this.allLoaded = true;
        } else {
          this.cats = [...this.cats, ...newCats.content];
        }
      },
      error: (err) =>
        this.toastrService.showErro('Erro', 'Falha ao buscar dados.'),
      complete: () => {
        this.loading = false;
      },
    });
  }

  getStatusLabel(status: StatusAnimal): string {
    return STATUS_ANIMAL_META[status]?.name ?? status;
  }
}
