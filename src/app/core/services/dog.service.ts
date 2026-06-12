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

  findAll(
    pageConfig: PageConfigDTO<DogFilterDTO>,
  ): Observable<PageDTO<DogDTO[]>> {
    return this.getFindAll<PageDTO<DogDTO[]>>(
      this.url,
      buildPaginationParams(pageConfig),
    );
  }

  add(dto: DogCreateDTO): Observable<DogDTO> {
    return this.post<DogDTO>(this.url, dto);
  }

  update(id: string, dto: DogCreateDTO): Observable<DogDTO> {
    return this.put<DogDTO>(this.url, id, dto);
  }

  findById(id: string): Observable<DogDTO> {
    return this.getFindById<DogDTO>(this.url, id);
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
