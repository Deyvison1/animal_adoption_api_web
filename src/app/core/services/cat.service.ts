import { PageDTO } from './../../shared/model/page/page.dto';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../../environments/environment';
import { PageConfigDTO } from '../../shared/model/page/page-config.dto';
import { CatDTO } from '../../shared/model/cat.dto';
import { Observable } from 'rxjs';
import { buildPaginationParams } from '../../shared/utils/http-utils';
import { CatCreateDTO } from '../../shared/model/cat-create.dto';
import { CatFilterDTO } from '../../shared/model/cat-filter.dto';

@Injectable({
  providedIn: 'root',
})
export class CatService extends HttpService {
  private readonly url: string = environment.apiUrl.concat('/cat');

  findAll(
    pageConfig: PageConfigDTO<CatFilterDTO>,
  ): Observable<PageDTO<CatDTO[]>> {
    const params = buildPaginationParams(pageConfig);
    return this.http.get<PageDTO<CatDTO[]>>(`${this.url}`, { params });
  }

  add(dto: CatCreateDTO): Observable<CatDTO> {
    return this.http.post<CatDTO>(`${this.url}`, dto);
  }

  update(id: string, dto: CatCreateDTO): Observable<CatDTO> {
    return this.http.put<CatDTO>(`${this.url}/${id}`, dto);
  }

  findById(id: string): Observable<CatDTO> {
    return this.http.get<CatDTO>(`${this.url}/${id}`);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  isPublish(id: string): Observable<void> {
    return this.http.get<void>(`${this.url}/is-publish/${id}`);
  }

  notPublish(id: string, motivo: string): Observable<void> {
    const params = { motivo };
    return this.http.get<void>(`${this.url}/not-publish/${id}`, { params });
  }
}
