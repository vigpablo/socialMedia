import { Component } from '@angular/core';
import { EditArticleComponent } from './components/edit-article.component';
import { EditArticleService } from './services/editArticle.service';
import { Route } from '@angular/router';
import * as editArticleEffects from './store/effects'
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { editArticleFeatureKey, editArticleReducer } from './store/reducers';



export const routes: Route[] = [
  {
    path: '',
    component: EditArticleComponent,
    providers: [
      EditArticleService,
      provideEffects(editArticleEffects),
      provideState(editArticleFeatureKey, editArticleReducer)],
  }
]
