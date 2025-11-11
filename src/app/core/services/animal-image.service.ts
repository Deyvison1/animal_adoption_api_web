import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AnimalImageDTO } from '../../shared/model/animal-image.dto';

@Injectable({
  providedIn: 'root',
})
export class AnimalImageService extends HttpService {
  private readonly url = environment.apiUrl.concat('/animal-image');

  uploadImage(haircutId: string, file: File, active: boolean = false) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('active', String(active));

    return this.http.post<AnimalImageDTO>(
      `${this.url}/${haircutId}/upload`,
      formData
    );
  }

  activateImage(id: string): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}/activate`, {});
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
