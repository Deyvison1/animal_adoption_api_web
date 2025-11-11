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
import { AnimalImageDTO } from '../../../shared/model/animal-image.dto';
import { GalleriaModule } from 'primeng/galleria';
import { ContactViewComponent } from '../contact-view/contact-view.component';
import { ContactDTO } from '../../../shared/model/contact.dto';

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
  ],
  templateUrl: './dog-list.component.html',
  styleUrl: './dog-list.component.scss',
})
export class DogListComponent implements OnInit {
  private readonly publicService: PublicService = inject(PublicService);
  dogs: DogDTO[] = [];
  pageConfig: PageConfigDTO<any> = pageConfig;
  loading = true;
  allLoaded = false;

  ngOnInit(): void {
    this.loadDogs();
  }

  getUriImageActive(dto: AnimalImageDTO[]) {
    const active = dto.find((x) => x.active);
    return `data:${active.contentType};base64,${active.data}`;
  }

  getUriImages(dto: AnimalImageDTO) {
    return `data:${dto.contentType};base64,${dto.data}`;
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
      error: (err) => console.error(err),
      complete: () => {
        this.loading = false;
      },
    });
  }
}
