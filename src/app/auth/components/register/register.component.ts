import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducers';
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';
import { BackendErrorMessages } from "../../../shared/components/backendErrorMessages/backendErrorMessages.component";




@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, CommonModule, BackendErrorMessages]
})
export class RegisterComponent {

  constructor(
    private fb:FormBuilder,
    private store: Store,
    ) {}

  form = this.fb.nonNullable.group ({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  // isSubmitting$ = this.store.select(selectIsSubmitting) //obsevable of boolean
  // backEndErrors$ = this.store.select(selectValidationErrors)
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backEndErrors: this.store.select(selectValidationErrors)
  })

  onSubmit():void {
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authActions.register({request})) // 1- onSubmit se dispara la acción register con el valor del request como parámetro. Continúa en reducers.
    // this.authService.register(request).subscribe(res => console.log(res))


  }

}
