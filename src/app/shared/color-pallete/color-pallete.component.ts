import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-color-pallete',
  templateUrl: './color-pallete.component.html',
  styleUrls: ['./color-pallete.component.css']
})
export class ColorPalleteComponent {

  currentColor = signal('')

constructor(){
  this.updateTheme()
}




  updateTheme() {
    if  (!('color-theme' in localStorage)) {
      document.body.removeAttribute('class') 
      // this.isDarkMode = true;

      // this.setAutofill('#777777')
    } else {

      console.log(localStorage['color-theme'])
      document.body.classList.add(localStorage['color-theme'])
      // this.isDarkMode = false;
      // this.setAutofill('white')
    }
    this.getCurrentColor()
  }

  getCurrentColor () {
  this.currentColor.set(localStorage['color-theme'])

  }


  changeColor(theme:string): void {
    document.body.removeAttribute('class') 

    localStorage['color-theme'] = theme
    this.updateTheme()
  }

  useOSPreference () {
    localStorage.removeItem('color-theme')
    this.updateTheme()
  }
}
