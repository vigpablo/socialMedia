import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BackendErrorsInterface } from "../../types/backendErrors.interface";


@Component({
  selector: 'app-backend-error-messages',
  templateUrl:'./backendErrorMessages.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class BackendErrorMessages implements OnInit {

  @Input() backendErrors: BackendErrorsInterface = {}

  errorMessages: string[] = []

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((name:string) => {
      const messages = this.backendErrors[name].join('')
      return `${name} ${messages}`
    }) //extrae los key del objeto y crea un array backendErrors con name espacio valor.
  }

}
