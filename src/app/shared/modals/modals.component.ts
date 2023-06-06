import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../services/modal.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements OnInit, OnDestroy {
  showModal: boolean;
  subscription: Subscription;
  @Input()
  size: string | number;

  constructor(private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.subscription = this.modalService.onToggle().subscribe(state => this.showModal = state);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleModal() {
    this.modalService.HandleShowModal();
  }

  toggleModalBg(e: any) {
    if(e.target.classList.contains('overlay')){
      this.modalService.HandleShowModal()
    }

  }


}