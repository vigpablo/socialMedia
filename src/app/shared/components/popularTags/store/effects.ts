import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {PopularTagType} from 'src/app/shared/types/popularTag.type'
import {PopularTagService} from '../services/popularTag.service'
import {popularTagsActions} from './actions'

export const getPopularTagsEffect = createEffect(
  (
    actions$ = inject(Actions), //importa las acciones
    popularTagsService = inject(PopularTagService)
  ) => {
    return actions$.pipe(
      ofType(popularTagsActions.getPopularTags), //2- en caso de dispararse la accion getPopularTags:
      switchMap(() => {
        return popularTagsService.getPopularTags().pipe( //2b- dispara el método del servicio que hace la petición http
          map((popularTags: PopularTagType[]) => {
            return popularTagsActions.getPopularTagsSuccess({popularTags}) //2c- toma la respuesta y la asigna como parámetro a la acción getPopularTagsSuccess (continúa en reducers)
          }),
          catchError(() => {
            return of(popularTagsActions.getPopularTagsFailure())
          })
        )
      })
    )
  },
  {functional: true}
)
