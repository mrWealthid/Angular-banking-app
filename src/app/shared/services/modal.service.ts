import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  showModal:boolean = false;
  private subject = new Subject<boolean>();

  constructor() { }

HandleShowModal(){
     this.showModal = !this.showModal
    this.subject.next(this.showModal)
}

onToggle():Observable<boolean> {
    return  this.subject.asObservable()
}


}