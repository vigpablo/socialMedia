import { Route } from "@angular/router";
import { loginRoutes, registerRoutes } from "src/app/auth/auth.routes";

export const appRoutes: Route[] = [
  {
    path:'',
    loadChildren: () => import('src/app/globalFeed/global-feed.routes').then((m) => m.routes),
  },
  {
    path:'register',
    loadChildren: () => import('src/app/auth/auth.routes').then((m) => registerRoutes),
  },

  {
    path:'login',
    loadChildren: () => import('src/app/auth/auth.routes').then((m) => loginRoutes),
  },
  {
    path:'feed',
    loadChildren: () => import('src/app/yourFeed/your-feed.routes').then((m) => m.routes),
  },
  {
    path:'tags/:slug',
    loadChildren: () => import('src/app/tagFeed/tag-feed.routes').then((m) => m.routes),
  },
  {
    path:'articles/new',
    loadChildren: () => import('src/app/createArticle/createArticle.routes').then((m) => m.routes),
  },
  {
    path:'articles/:slug',
    loadChildren: () => import('src/app/article/article.routes').then((m) => m.routes),
  },
  {
    path:'articles/:slug/edit',
    loadChildren: () => import('src/app/editArticle/editArticle.routes').then((m) => m.routes),
  },
  {
    path:'settings',
    loadChildren: () => import('src/app/settings/settings.routes').then((m) => m.routes),
  },
  {
    path:'profiles/:slug',
    loadChildren: () => import('src/app/userProfile/userProfile.routes').then((m) => m.routes),
  },
  {
    path:'profiles/:slug/favorites',
    loadChildren: () => import('src/app/userProfile/userProfile.routes').then((m) => m.routes),
  },

]

//recordar main.ts: bootstrapApplication(AppComponent, {providers: [provideRouter(appRoutes)]})
