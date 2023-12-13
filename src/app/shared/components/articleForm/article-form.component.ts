import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleFormValuesInterface } from './types/articleFormValues.interface';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BackendErrorMessages } from '../backendErrorMessages/backendErrorMessages.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  standalone: true,
  imports: [BackendErrorMessages, ReactiveFormsModule, CommonModule]
})
export class ArticleFormComponent implements OnInit {
@Input() initialValues?: ArticleFormValuesInterface
@Input() isSubmitting: boolean = false
@Input() errors: BackendErrorsInterface | null = null

@Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>()

constructor(private fb: FormBuilder){}

form = this.fb.nonNullable.group({
  title: '',
  description: '',
  body: '',
  tagList: '',
})

ngOnInit(): void {
  this.initializeForm()
}

initializeForm(): void {
  if(!this.initialValues){
    throw new Error('Inputs are not provided')
  }
  this.form.patchValue({
    title: this.initialValues.title,
    description: this.initialValues.description,
    body: this.initialValues.body,
    tagList: this.initialValues.tagList.join(''),
  })
}

onSubmit():void {
  const formValue = this.form.getRawValue()
  const articleFormValues: ArticleFormValuesInterface = {
    ...formValue, tagList: formValue.tagList.split('')
  }
  this.articleSubmit.emit(articleFormValues) //creating article form video
}

}
