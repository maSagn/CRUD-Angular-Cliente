import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { RolModel } from '../Interface/RolModel';
import { Result } from '../Interface/Result';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private url = "http://localhost:8081/api/rol";

  constructor(private http: HttpClient) { }

  getAll(): Observable<RolModel[]> {
    return this.http.get<Result<RolModel[]>>(this.url).pipe(
      map(response => response.object)
    );
  }
}
