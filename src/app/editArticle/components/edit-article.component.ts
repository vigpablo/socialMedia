import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { ArticleFormComponent } from 'src/app/shared/components/articleForm/article-form.component';
import { ArticleFormValuesInterface } from 'src/app/shared/components/articleForm/types/articleFormValues.interface';
import { ArticleRequestInterface } from 'src/app/shared/services/articleRequest.interface';
import { editArticleActions } from '../store/actions';
import { CommonModule } from '@angular/common';
import { selectIsSubmitting, selectValidationErrors, selectIsLoading, selectArticle } from '../store/reducers';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ActivatedRoute } from '@angular/router';
import { ArticleInterface } from '../../shared/types/article.interface';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  standalone: true,
  imports: [ArticleFormComponent, CommonModule, LoadingComponent]
})
export class EditArticleComponent implements OnInit {
  // initialValues = {
  //   title: '',
  //   description: '',
  //   body: '',
  //   tagList: [],
  // }

  constructor(private store: Store, private route: ActivatedRoute){}
  ngOnInit(): void {
    this.store.dispatch(editArticleActions.getArticle({slug: this.slug}))
  }

  initialValues$: Observable<ArticleFormValuesInterface> = this.store.pipe(
    select(selectArticle),//o this.store.select( selectArticle ), se puede usar this.store.select y despues pipe, o pipe, select y todos los otros métodos
    filter((article): article is ArticleInterface => article !== null),
    map((article: ArticleInterface) => {
      return {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      }
    })
  )//no queremos initial values null entonces lo componemos una vez que hayamos fetcheado el article al api. We're selecting our article, checking it's not null and mapping it to this initial values.

  slug = this.route.snapshot.paramMap.get('slug') ?? ''
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    isLoading: this.store.select(selectIsLoading),
    initialValues: this.initialValues$
  })

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues
    }

    this.store.dispatch(editArticleActions.updateArticle({request, slug: this.slug}))
  }
}
