import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css'],

})
export class LabelComponent {
  @Input({required: true}) label: string;
  @Input({required: true}) required: boolean


}
