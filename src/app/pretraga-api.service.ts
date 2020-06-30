import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchData } from './pretraga-model';

@Injectable({
  providedIn: 'root'
})
export class PretragaApiService {

  constructor(private _httpClient: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api';
  private apiUrlDownload = 'http://localhost:8080/';

  getLawsByTitle(limit: number, offset: number, query: String): Observable<SearchData> {

    const href = this.apiUrl + '/titleSearch/';
    const requestUrl = `${href}${query}?limit=${limit}&offset=${offset}`;

    return this._httpClient.get<SearchData>(requestUrl);
  }

  getLawsByText(limit: number, offset: number, query: String): Observable<SearchData> {

    const href = this.apiUrl + '/textSearch/';
    const requestUrl = `${href}${query}?limit=${limit}&offset=${offset}`;

    return this._httpClient.get<SearchData>(requestUrl);
  }

  downloadDoc(uuid: string) {

    const href = this.apiUrlDownload + 'downloadFile/';
    const requestUrl = `${href}${uuid}`;
    return window.open(requestUrl);
  }
}
