import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { Observable, map } from "rxjs";
import { CurrentUserInterface } from "src/app/shared/types/currentUserInterface";
import { AuthResponseInterface } from "../types/authResponse.interface";
import { environment } from "src/environments/environment";
import { LoginRequestInterface } from "../types/loginRequest.interface";
import { CurrentUserRequestInterface } from "src/app/shared/types/currenteUserRequest.interface";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(response:AuthResponseInterface): CurrentUserInterface {
    return response.user
  } //para simplificar (map((response) => response.user)) en register y login. Lo puse solo el register.

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface>{
    const url = environment.apiUrl + '/users'
    return this.http.post<AuthResponseInterface>(url, data)
    .pipe(map(this.getUser))
  } // 4- el método register dispara la petición http con la url y la data de la acción (llamada request en el effect) con la forma de registerRequestInterface y retorna
    //una response con la forma AuthResponseInterface de la cual rescato el user. Continúa en effects.

  login(data: LoginRequestInterface): Observable<CurrentUserInterface>{
    const url = environment.apiUrl + '/users/login'
    return this.http.post<AuthResponseInterface>(url, data)
    .pipe(map((response) => response.user))
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user'
    return this.http.get<AuthResponseInterface>(url)
    .pipe(map(this.getUser))
  } //fetching of current user after each loading of the page: igual q el register pero a /user, get en vez de post y sin proveer data, solo url.

  updateCurrentUser(
    currentUserRequest: CurrentUserRequestInterface
  ): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user'
    return this.http
      .put<AuthResponseInterface>(url, currentUserRequest)
      .pipe(map(this.getUser))
  }

}

