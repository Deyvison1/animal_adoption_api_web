import { PageDTO } from './../../shared/model/page/page.dto';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PageConfigDTO } from '../../shared/model/page/page-config.dto';
import { HttpService } from './http.service';
import { DogDTO } from '../../shared/model/dog.dto';
import { Injectable } from '@angular/core';
import { buildPaginationParams } from '../../shared/utils/http-utils';

@Injectable({
  providedIn: 'root'
})
export class PublicService extends HttpService {
  private readonly url: string = environment.apiUrlPublic;

  findAllDogs(pageConfig: PageConfigDTO<any>): Observable<PageDTO<DogDTO[]>> {
    const params = buildPaginationParams(pageConfig);
    return this.http.get<PageDTO<DogDTO[]>>(`${this.url}/dogs`, { params }).pipe(shareReplay(1));
  }
}
