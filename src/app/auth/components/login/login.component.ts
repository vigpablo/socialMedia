import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducers';
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';
import { BackendErrorMessages } from "../../../shared/components/backendErrorMessages/backendErrorMessages.component";
import { LoginRequestInterface } from '../../types/loginRequest.interface';




@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, CommonModule, BackendErrorMessages]
})
export class LoginComponent {

  constructor(
    private fb:FormBuilder,
    private store: Store,
    ) {}

  form = this.fb.nonNullable.group ({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  // isSubmitting$ = this.store.select(selectIsSubmitting) //obsevable of boolean
  // backEndErrors$ = this.store.select(selectValidationErrors)
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backEndErrors: this.store.select(selectValidationErrors)
  })// 7- data$ combina los selectores del state y se renderizan en el html.

  onSubmit():void {
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authActions.login({request})) // 1- onSubmit se dispara la acción register con el valor del request como parámetro. Continúa en reducers.
    // this.authService.register(request).subscribe(res => console.log(res))


  }

}

//recordar instalar npm i @ngrx/router-store, proveerlo en main.ts y agregar la acción routerNavogationAction en el reducer // para hacer que los backend errors se borren luego de recargar páginas.
