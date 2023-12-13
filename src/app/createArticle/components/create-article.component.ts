import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { ArticleFormComponent } from 'src/app/shared/components/articleForm/article-form.component';
import { ArticleFormValuesInterface } from 'src/app/shared/components/articleForm/types/articleFormValues.interface';
import { selectIsSubmitting, selectValidationErrors } from '../store/reducers';
import { ArticleRequestInterface } from 'src/app/shared/services/articleRequest.interface';
import { createArticleActions } from '../store/actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  standalone: true,
  imports: [ArticleFormComponent, CommonModule]
})
export class CreateArticleComponent {
  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  }

  constructor(private store: Store){}

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues
    }

    this.store.dispatch(createArticleActions.createArticle({request}))
  }
}
