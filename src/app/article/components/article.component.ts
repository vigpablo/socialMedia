import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { articleActions } from '../store/actions';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, filter, map } from 'rxjs';
import { selectArticleData, selectError, selectIsLoading } from '../store/reducers';
import { selectCurrentUser } from 'src/app/auth/store/reducers';
import { CurrentUserInterface } from 'src/app/shared/types/currentUserInterface';
import { CommonModule } from '@angular/common';
import { TagListComponent } from 'src/app/shared/components/tag-list/tag-list.component';
import { ErrorMessageComponent } from 'src/app/shared/components/errorMessage/error-message.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  standalone: true,
  imports: [CommonModule, TagListComponent, ErrorMessageComponent, LoadingComponent, RouterLink]
})
export class ArticleComponent implements OnInit {

  constructor(private store: Store, private route: ActivatedRoute){}

  slug = this.route.snapshot.paramMap.get('slug') ?? ''
  isAuthor$ = combineLatest({
    article: this.store.select(selectArticleData),
    currentUser: this.store.select(selectCurrentUser)
    .pipe(filter(
      (currentUser): currentUser is CurrentUserInterface | null => currentUser !== undefined)) //video rendering article page
  }).pipe(
    map(({article, currentUser}) => {
      if(!article || !currentUser) {
        return false
      }
      return article.author.username === currentUser.username
    })
  )
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    article: this.store.select(selectArticleData),
    isAuthor: this.isAuthor$,
  })

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({slug: this.slug}))
  }

  deleteArticle():void {
    this.store.dispatch(articleActions.deleteArticle({slug: this.slug}))
  }

}
