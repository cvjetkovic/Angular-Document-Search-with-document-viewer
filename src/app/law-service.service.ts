import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LawServiceService {
  url: '';
  constructor(private _httpClient: HttpClient) { }

  
  getLaw(uuid: any)  { 
    console.log("usi" , uuid);
    this.url = uuid;
    return this._httpClient.get(`http://localhost:8080/downloadFile/${uuid}?fileType=word`,   {responseType: 'text' }); 
  }

  postLaw() {
    return this._httpClient.get(this.url);
  }
}
