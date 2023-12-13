import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../types/authState.Interface";
import { authActions } from './actions';
import { routerNavigatedAction } from "@ngrx/router-store";

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: undefined,
  validationErrors: null,
}

const authFeature = createFeature ({
  name: 'auth',
  reducer: createReducer(initialState,
    on(authActions.register, (state) => ({...state, isSubmitting: true, validationErros: null})), // 2- La acción lleva al reducer que cambia los valores del initialState. Continúa en effects.
    on(authActions.registerSuccess, (state, action) => ({...state, isSubmitting: false, currentUser: action.currentUser})),
    on(authActions.registerFailure, (state, action) => ({...state, isSubmitting: false, validationErrors: action.errors})),

    on(authActions.login, (state) => ({...state, isSubmitting: true, validationErros: null})),
    on(authActions.loginSuccess, (state, action) => ({...state, isSubmitting: false, currentUser: action.currentUser})),
    on(authActions.loginFailure, (state, action) => ({...state, isSubmitting: false, validationErrors: action.errors})),
    on(routerNavigatedAction, (state) => ({...state, validationErrors: null})),

    on(authActions.getCurrentUser, (state) => ({...state, isLoading: true,})), // IsLoading porque en algun momento necesitaremos esperar cargar el current user y mostrar un indicador de carga.
    on(authActions.getCurrentUserSuccess, (state, action) => ({...state, isLoading: false, currentUser: action.currentUser})),
    on(authActions.getCurrentUserFailure, (state) => ({...state, isSubmitting: false, currentUser: null})), //sacamos action porque no traemos ningún dato

    on(authActions.updateCurrentUserSuccess, (state, action) => ({...state, currentUser: action.currentUser})),//updatecurrentuser y updatecurrentusererrors puede ir en el componente mismo.(settings/store/reducers)
    on(routerNavigatedAction, (state) => ({...state, validationErrors: null})),

    on(authActions.logout, (state) => ({
      ...state,
      ...initialState,
      currentUser: null,
    }))
  )
})
//6- Con las acciones success o failure el reducer modifica el state cuyas secciones de info son asignadas los selectores. Continúa en el componente.ts
export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors
} = authFeature
