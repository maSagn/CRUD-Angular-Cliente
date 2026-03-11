import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../Interface/UsuarioModel';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Result } from '../Interface/Result';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = "http://localhost:8081/api/usuario";

  constructor(private http: HttpClient) { }

  getAll(): Observable<UsuarioModel[]> {
    return this.http.get<Result<UsuarioModel[]>>(this.url).pipe(
      map(response => response.object)
    );
  }

  getById(idUsuario: number): Observable<UsuarioModel> {
    return this.http.get<Result<UsuarioModel>>(`${this.url}/${idUsuario}`).pipe(
      map(response => response.object)
    );
  }

  add(usuario : UsuarioModel): Observable<UsuarioModel> {
    return this.http.post<Result<UsuarioModel>>(this.url, usuario).pipe(
      map(response => response.object)
    );
  }

  update(usuario : UsuarioModel, idUsuario : number): Observable<UsuarioModel> {
    return this.http.patch<Result<UsuarioModel>>(`${this.url}/${idUsuario}`, usuario).pipe(
      map(response => response.object)
    );
  }

  delete(idUsuario : number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${idUsuario}`);
  }
}
