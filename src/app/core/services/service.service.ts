import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Data } from '../interface/model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends RestService<Data>{
  override url = environment.apiUrlNode ;

  constructor(http: HttpClient) {
    super(http);
  }
}
