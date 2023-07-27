import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
  // tabs: ITabs[] = [{
  //   title: "Loan Request",
  //   external: false,
  //   step: 1
  //
  // }, {
  //   title: "Make Payment",
  //   external: false,
  //   step: 2
  //
  // }]
  selectedTab: number = 1;
  @Input({required: true}) tabs: ITabs[] = []
  @Output() steps = new EventEmitter<number>();

  navigateTab(number: number) {
    this.selectedTab = number
    this.steps.emit(number)
  }


}


export type ITabs = {
  title: string,
  icon:string

} & (LinksProps | StepsProps)

type LinksProps = { external: true, link: string }

type StepsProps = { external: false, step: number }
