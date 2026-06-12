import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../../environments/environment';
import { AnimalTypeDTO } from '../../shared/model/animal-type.dto';
import { Observable } from 'rxjs';
import { PageConfigDTO } from '../../shared/model/page/page-config.dto';
import { buildPaginationParams } from '../../shared/utils/http-utils';
import { PageDTO } from '../../shared/model/page/page.dto';

@Injectable({
  providedIn: 'root',
})
export class AnimalTypeService extends HttpService {
  private readonly url: string = environment.apiUrl.concat('/animal-type');

  add(dto: AnimalTypeDTO): Observable<AnimalTypeDTO> {
    return this.post<AnimalTypeDTO>(this.url, dto);
  }

  update(id: string, dto: AnimalTypeDTO): Observable<AnimalTypeDTO> {
    return this.put<AnimalTypeDTO>(this.url, id, dto);
  }

  delete(id: string): Observable<void> {
    return this.remove<void>(this.url, id);
  }

  findAll(
    pageConfig: PageConfigDTO<any>,
  ): Observable<PageDTO<AnimalTypeDTO[]>> {
    return this.getFindAll<PageDTO<AnimalTypeDTO[]>>(
      this.url,
      buildPaginationParams(pageConfig),
    );
  }

  findById(id: string): Observable<AnimalTypeDTO> {
    return this.getFindById<AnimalTypeDTO>(this.url, id);
  }
}
