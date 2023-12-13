import {CommonModule} from '@angular/common'
import {Component, OnInit} from '@angular/core'
import {RouterLink} from '@angular/router'
import {Store} from '@ngrx/store'
import {combineLatest} from 'rxjs'
import {ErrorMessageComponent} from '../errorMessage/error-message.component'
import {LoadingComponent} from '../loading/loading.component'
import {popularTagsActions} from './store/actions'
import {
  selectError,
  selectIsLoading,
  selectPopularTagsData,
} from './store/reducers'

@Component({
  selector: 'app-popular-tags',
  templateUrl: './popularTags.component.html',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorMessageComponent, RouterLink],
})
export class PopularTagsComponent implements OnInit {
  data$ = combineLatest({
    popularTags: this.store.select(selectPopularTagsData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  }) //se combinan los selectores y se renderizan en el html.

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(popularTagsActions.getPopularTags()) //1-dispara la acción getPopularTags la cual cambia el state. (continúa en store/effects)
  }
}
