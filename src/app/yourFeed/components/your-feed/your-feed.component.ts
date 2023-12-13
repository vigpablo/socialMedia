import { Component } from '@angular/core';
import { BannerComponent } from 'src/app/shared/components/banner/banner.component';
import { ErrorMessageComponent } from 'src/app/shared/components/errorMessage/error-message.component';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';
import { FeedTogglerComponent } from 'src/app/shared/components/feedToggler/feedToggler.component';
import { PopularTagsComponent } from 'src/app/shared/components/popularTags/popularTags.component';

@Component({
  selector: 'app-your-feed',
  templateUrl: './your-feed.component.html',
  standalone: true,
  imports: [FeedComponent, BannerComponent, ErrorMessageComponent, PopularTagsComponent, FeedTogglerComponent]
})
export class YourFeedComponent {
  apiUrl= '/articles/feed'
}
