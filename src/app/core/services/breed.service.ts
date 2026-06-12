import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../../environments/environment';
import { BreedDTO } from '../../shared/model/breed.dto';
import { Observable } from 'rxjs';
import { PageConfigDTO } from '../../shared/model/page/page-config.dto';
import { PageDTO } from '../../shared/model/page/page.dto';
import { buildPaginationParams } from '../../shared/utils/http-utils';

@Injectable({
  providedIn: 'root',
})
export class BreedService extends HttpService {
  private readonly url: string = environment.apiUrl.concat('/breed');

  add(dto: BreedDTO): Observable<BreedDTO> {
    return this.post<BreedDTO>(this.url, dto);
  }

  update(id: string, dto: BreedDTO): Observable<BreedDTO> {
    return this.put<BreedDTO>(this.url, id, dto);
  }

  delete(id: string): Observable<void> {
    return this.remove<void>(this.url, id);
  }

  findAll(pageConfig: PageConfigDTO<any>): Observable<PageDTO<BreedDTO[]>> {
    return this.getFindAll<PageDTO<BreedDTO[]>>(
      this.url,
      buildPaginationParams(pageConfig),
    );
  }

  findById(id: string): Observable<BreedDTO> {
    return this.getFindById<BreedDTO>(this.url, id);
  }
}
