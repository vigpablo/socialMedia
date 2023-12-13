import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { authActions } from "./actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { CurrentUserInterface } from "src/app/shared/types/currentUserInterface";
import { HttpErrorResponse } from "@angular/common/http";
import { PersistanceService } from "src/app/shared/services/persistance.service";
import { Router } from "@angular/router";

//3- el effect dispara el método register o login del servicio con la info de la acción. Continúa en authservice.

export const registerEffect = createEffect((
  actions$ = inject(Actions),
  authService = inject(AuthService),
  persistanceService = inject(PersistanceService)) => {
    return actions$.pipe(
  ofType(authActions.register),
  switchMap(({request}) => { //el switch map devuelve un observable
    return authService.register(request).pipe(
      map((currentUser: CurrentUserInterface) => {
        persistanceService.set('accesToken', currentUser.token) //para que la info persista cuando recargo las paginas
        return authActions.registerSuccess({currentUser}) // 5 - dispara la acción resgisterSucces o registerFailure con la info proveniente del servicio. Continúa en reducers.
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return of(authActions.registerFailure({
          errors: errorResponse.error.errors,
        }))
      })
    )
  })
)
}, {functional: true}
)

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/')
      })
    )
  },
  {functional:true, dispatch: false} //redirige al home luego de registrarse.
)


export const loginEffect = createEffect((
  actions$ = inject(Actions),
  authService = inject(AuthService),
  persistanceService = inject(PersistanceService)) => {
    return actions$.pipe(
  ofType(authActions.login),
  switchMap(({request}) => {
    return authService.login(request).pipe(
      map((currentUser: CurrentUserInterface) => {
        persistanceService.set('accesToken', currentUser.token) //para que la info persista cuando recargo las paginas
        return authActions.loginSuccess({currentUser}) // 3b - dispara la acción resgisterSucces o registerFailure.
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return of(authActions.loginFailure({
          errors: errorResponse.error.errors,
        }))
      })
    )
  })
)
}, {functional: true}
)

export const redirectAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => {
        router.navigateByUrl('/')
      })
    )
  },
  {functional:true, dispatch: false} //redirige al home luego de registrarse.
)


export const getCurrentUserEffect = createEffect((
  actions$ = inject(Actions),
  authService = inject(AuthService),
  persistanceService = inject(PersistanceService)) => {
    return actions$.pipe(
  ofType(authActions.getCurrentUser),
  switchMap(() => {
    const token = persistanceService.get('accessToken')

    if(!token) {
      return of(authActions.getCurrentUserFailure()) //chequea si el usuario esta logueado, si no encuentra token corta acá y no hace una petición del user innecesaria. Como el catch error.
    }
    return authService.getCurrentUser().pipe(
      map((currentUser: CurrentUserInterface) => {
        return authActions.getCurrentUserSuccess({currentUser}) // 3b - dispara la acción resgisterSucces o registerFailure.
      }),
      catchError(() => {
        return of(authActions.getCurrentUserFailure()
        )
      })
    )
  })
)
}, {functional: true}
)

export const updateCurrentUserEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.updateCurrentUser),
      switchMap(({currentUserRequest}) => {
        return authService.updateCurrentUser(currentUserRequest).pipe(
          map((currentUser: CurrentUserInterface) => {
            return authActions.updateCurrentUserSuccess({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.updateCurrentUserFailure({
                errors: errorResponse.error.errors,
              })
            )
          })
        )
      })
    )
  },
  {functional: true}
)

export const logoutEffect = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.logout),
      tap(() => {
        persistanceService.set('accessToken', '')
        router.navigateByUrl('/')
      })
    )
  },
  {functional: true, dispatch: false}
)


