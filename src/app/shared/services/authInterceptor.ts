import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { PersistanceService } from "./persistance.service";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const persistanceService = inject(PersistanceService)
  const token = persistanceService.get('accessToken')
  request = request.clone({
    setHeaders: { //our backend wants to get a header not a params
      Authhorization: token ? 'Token ${token}' : '', //'Authhorization' is te exact name this api is expecting. Con la palabra Token seguido del token.
    },
  })
  return next(request) //What does this intercepetor does? It gets this request, attaches the head inside and returns this request back.
  // recordar agregar al provideHttpClient -> (withInterceptors([authInterceptor])) en el main.ts
}
