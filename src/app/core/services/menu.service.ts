import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable, shareReplay } from 'rxjs';
import { MenuDTO } from '../../shared/model/menu.dto';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService extends HttpService {
  url = environment.apiUrl.concat('/menu');

  findAll(): Observable<MenuDTO[]> {
    return this.http
      .get<MenuDTO[]>(`${this.url}`)
      .pipe(
        map((menus) =>
          [...menus].sort((a, b) => a.label.localeCompare(b.label))
        )
      )
      .pipe(shareReplay(1));
  }
}
