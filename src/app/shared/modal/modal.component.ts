import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  showModal: boolean = false;
  @Output()
  modalState = new EventEmitter<any>();
  @Input()
  modalStates: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleModal() {
    this.showModal = !this.showModal;
    this.modalState.emit(false);
  }

  toggleModalBg(e: any) {
    //used event delegation here

    if (e.target.classList.contains('overlay')) {
      this.modalState.emit(false);
    }
  }
}
