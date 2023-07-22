import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],

})
export class DropdownComponent {
  @Input() styles: string = 'right-10 top-6 w-[180px]'
  isMenuOpened: boolean = false;

  toggleMenu(ev?: any): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  clickedOutside(): void {
    this.isMenuOpened = false;
  }
}
