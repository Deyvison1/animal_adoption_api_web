import { PageDTO } from './../../shared/model/page/page.dto';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../../environments/environment';
import { PageConfigDTO } from '../../shared/model/page/page-config.dto';
import { DogDTO } from '../../shared/model/dog.dto';
import { Observable } from 'rxjs';
import { buildPaginationParams } from '../../shared/utils/http-utils';
import { DogCreateDTO } from '../../shared/model/dog-create.dto';
import { DogFilterDTO } from '../../shared/model/dog-filter.dto';

@Injectable({
  providedIn: 'root',
})
export class DogService extends HttpService {
  private readonly url: string = environment.apiUrl.concat('/dog');

  findAll(pageConfig: PageConfigDTO<DogFilterDTO>): Observable<PageDTO<DogDTO[]>> {
    const params = buildPaginationParams(pageConfig);
    return this.http.get<PageDTO<DogDTO[]>>(`${this.url}`, { params });
  }

  add(dto: DogCreateDTO): Observable<DogDTO> {
    return this.http.post<DogDTO>(`${this.url}`, dto);
  }

  update(id: string, dto: DogCreateDTO): Observable<DogDTO> {
    return this.http.put<DogDTO>(`${this.url}/${id}`, dto);
  }

  findById(id: string): Observable<DogDTO> {
    return this.http.get<DogDTO>(`${this.url}/${id}`);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
