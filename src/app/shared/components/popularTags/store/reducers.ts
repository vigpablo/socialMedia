import {createFeature, createReducer, on} from '@ngrx/store'
import {PopularTagsStateInterface} from '../types/popularTagsState.interface'
import {popularTagsActions} from './actions'

const initialState: PopularTagsStateInterface = {
  isLoading: false,
  error: null,
  data: null,
}

const popularTagsFeature = createFeature({
  name: 'popularTags',
  reducer: createReducer(
    initialState,
    on(popularTagsActions.getPopularTags, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(popularTagsActions.getPopularTagsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.popularTags,
    })), // 3- cambia el state asignando la respuesta a data
    on(popularTagsActions.getPopularTagsFailure, (state) => ({
      ...state,
      isLoading: false,
    }))
  ),
})

export const {
  name: popularTagsFeatureKey,
  reducer: popularTagsReducer,
  selectIsLoading,
  selectError,
  selectData: selectPopularTagsData,
} = popularTagsFeature //3b- los selectores posiblitan al componente acceder a esa info (continúa en el popularTags.component)
