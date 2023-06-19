import {Component} from '@angular/core';
import {BsDropdownConfig} from "ngx-bootstrap/dropdown";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [{
    provide: BsDropdownConfig,
    useValue: {isAnimated: false}
  }]
})
export class DropdownComponent {

  isMenuOpened: boolean = false;

  toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  clickedOutside(): void {
    this.isMenuOpened = false;
  }
}
