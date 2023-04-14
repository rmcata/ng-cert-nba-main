import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent {

  modal$ = this._modalService.template$;

  constructor(private _modalService: ModalService){}

  closeModal(){
    this._modalService.closeModal();
  }

}
