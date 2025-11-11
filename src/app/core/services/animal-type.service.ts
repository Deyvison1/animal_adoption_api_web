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
    return this.http.post<AnimalTypeDTO>(`${this.url}`, dto);
  }

  update(id: string, dto: AnimalTypeDTO): Observable<AnimalTypeDTO> {
    return this.http.put<AnimalTypeDTO>(`${this.url}/${id}`, dto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  findAll(
    pageConfig: PageConfigDTO<any>
  ): Observable<PageDTO<AnimalTypeDTO[]>> {
    const params = buildPaginationParams(pageConfig);
    return this.http.get<PageDTO<AnimalTypeDTO[]>>(`${this.url}`, { params });
  }

  findById(id: string): Observable<AnimalTypeDTO> {
    return this.http.get<AnimalTypeDTO>(`${this.url}/${id}`);
  }
}
