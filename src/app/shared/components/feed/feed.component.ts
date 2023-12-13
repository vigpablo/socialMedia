import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { feedActions } from './store/actions';
import { combineLatest } from 'rxjs';
import { selectError, selectFeedData, selectIsLoading } from './store/reducers';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../errorMessage/error-message.component';
import { LoadingComponent } from '../loading/loading.component';
import { environment } from 'src/environments/environment';
import { PaginationComponent } from '../pagination/pagination.component';
import { TagListComponent } from '../tag-list/tag-list.component';
import { AddToFavoritesComponent } from '../addToFavorites/add-to-favorites.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListComponent,
    AddToFavoritesComponent,]
})
export class FeedComponent implements OnInit, OnChanges {

  @Input() apiUrl: string = ' '

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData)
  })

  limit = environment.limit
  baseUrl = this.router.url.split('?')[0] //video Creating pagination
  currentPage: number = 0

  constructor(private store: Store, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {


    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['page'] || '1')
      this.fetchFeed()
    }) // pagination video
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlCHanged = !changes['apiUrl'].firstChange && changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue

    if(isApiUrlCHanged){
      this.fetchFeed()
    }
  }

  fetchFeed():void {
    this.store.dispatch(feedActions.getFeed({url: this.apiUrl}))
  }


}


