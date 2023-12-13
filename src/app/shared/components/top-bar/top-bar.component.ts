import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectCurrentUser } from 'src/app/auth/store/reducers';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
 standalone: true,
 imports: [CommonModule, RouterLink]
})
export class TopBarComponent {
  constructor(private store: Store) {}

  //currentUser$ = this.store.select(selectCurrentUser) se puede así ay que solo neceistamos el usuario,
  //pero siguiendo lo que veniamos haciendo, usamos combine latest por si necesitamos agregar mas datos, entonces:
  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser)
  })
}
