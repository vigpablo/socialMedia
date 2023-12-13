import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription, combineLatest, filter } from 'rxjs';
import { selectCurrentUser } from 'src/app/auth/store/reducers';
import { CurrentUserInterface } from 'src/app/shared/types/currentUserInterface';
import { selectIsSubmitting, selectValidationErrors } from '../store/reducers';
import { CommonModule } from '@angular/common';
import { BackendErrorMessages } from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component';
import { CurrentUserRequestInterface } from 'src/app/shared/types/currenteUserRequest.interface';
import { authActions } from 'src/app/auth/store/actions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BackendErrorMessages]
})
export class SettingsComponent implements OnInit, OnDestroy {

  constructor( private fb: FormBuilder, private store: Store){}


  form = this.fb.nonNullable.group({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  })

  currentUser?: CurrentUserInterface
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })

  currentUserSubscription?:Subscription

  ngOnInit(): void {
    this.currentUserSubscription = this.store.pipe(
      select(selectCurrentUser),
      filter(Boolean) // will filter null and undefined out
    ).subscribe(currentUser => {
      this.currentUser = currentUser
      this.initializeForm()
    })//que aparezca el form con los datos precargados
  }

  initializeForm():void {
    if (!this.currentUser) {
      throw new Error('current user is not set')
    }
    this.form.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username,
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email,
      password: '',
    })
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe()
  }

  submit():void {
    if (!this.currentUser) {
      throw new Error('current user is not set')
    }
    const currentUserRequest: CurrentUserRequestInterface = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue(),
      } //merges all fields of current user fields with the form's value
    }
    this.store.dispatch(authActions.updateCurrentUser({currentUserRequest}))
  }

  logout():void {
    this.store.dispatch(authActions.logout())
  }
}
