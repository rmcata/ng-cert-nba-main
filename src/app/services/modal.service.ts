import { Injectable, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _template = new Subject<TemplateRef<any> | undefined>;
  template$ = this._template.asObservable();

  constructor() { }

  openModal(template: TemplateRef<any>){
    this._template.next(template);
  }

  closeModal(){
    this._template.next(undefined);
  }
}
