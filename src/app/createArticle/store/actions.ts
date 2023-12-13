import {createActionGroup, props} from '@ngrx/store'
import { ArticleRequestInterface } from 'src/app/shared/services/articleRequest.interface'
import {ArticleInterface} from 'src/app/shared/types/article.interface'
import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface'

export const createArticleActions = createActionGroup({
  source: 'create article',
  events: {
    'Create article': props<{request: ArticleRequestInterface}>(),
    'Create article success': props<{article: ArticleInterface}>(),
    'Create article failure': props<{errors: BackendErrorsInterface}>(),
  },
})
