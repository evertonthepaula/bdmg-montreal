import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class ViaCepResponse {
  cep: string = '';
  logradouro: string = '';
  complemento: string = '';
  bairro: string = '';
  localidade: string = '';
  uf: string = '';
  ibge: string = '';
  gia: string = '';
  ddd: string = '';
  siafi: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(public http: HttpClient) { }

  get(): Observable<ViaCepResponse> {
    return this.http.get<ViaCepResponse>(`https://viacep.com.br/ws/30160907/json/`);
  }
}