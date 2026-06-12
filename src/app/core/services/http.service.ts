import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class HttpService {
  protected http: HttpClient = inject(HttpClient);

  protected getFindAll<TResponse>(
    url: string,
    params?: HttpParams,
  ): Observable<TResponse> {
    return this.http.get<TResponse>(url, { params });
  }

  protected getFindById<TResponse>(
    url: string,
    id: string,
  ): Observable<TResponse> {
    return this.http.get<TResponse>(`${url}/${id}`);
  }

  protected remove<TResponse>(url: string, id: string): Observable<TResponse> {
    return this.http.delete<TResponse>(`${url}/${id}`);
  }

  protected post<TResponse>(url: string, body: unknown): Observable<TResponse> {
    return this.http.post<TResponse>(`${url}`, body);
  }

  protected put<TResponse>(
    url: string,
    id: string,
    body: unknown,
  ): Observable<TResponse> {
    return this.http.put<TResponse>(`${url}/${id}`, body);
  }

  protected patch<TResponse>(
    url: string,
    body?: unknown,
  ): Observable<TResponse> {
    return this.http.patch<TResponse>(url, body ?? null);
  }
}
