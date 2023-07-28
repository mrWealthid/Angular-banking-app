import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-summary-cards',
  templateUrl: './summary-cards.component.html',
  styleUrls: ['./summary-cards.component.css']
})
export class SummaryCardsComponent {
  @Input({required: true}) value: number
  @Input() valueTxt: string = 'Balance'

  showValue = false


  toggleValue() {
    this.showValue = !this.showValue
  }


}
