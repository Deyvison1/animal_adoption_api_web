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
    return this.getFindAll<PageDTO<CatDTO[]>>(
      this.url,
      buildPaginationParams(pageConfig),
    );
  }

  add(dto: CatCreateDTO): Observable<CatDTO> {
    return this.post<CatDTO>(this.url, dto);
  }

  update(id: string, dto: CatCreateDTO): Observable<CatDTO> {
    return this.put<CatDTO>(this.url, id, dto);
  }

  findById(id: string): Observable<CatDTO> {
    return this.getFindById<CatDTO>(this.url, id);
  }

  delete(id: string): Observable<void> {
    return this.remove<void>(this.url, id);
  }

  publish(id: string): Observable<void> {
    return this.patch<void>(`${this.url}/${id}/publish`);
  }

  unpublish(id: string, motivo: string): Observable<void> {
    return this.patch<void>(`${this.url}/${id}/unpublish`, { motivo });
  }
}
