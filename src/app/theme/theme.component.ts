import {Component} from '@angular/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent {

  isDarkMode = false;

  constructor() {
   this.updateTheme()
  }
 
  ngOnInit(): void {


  }





  setAutofill(color:string) {
    let r;
    if(!localStorage['color-theme']) {
      r = document.querySelector(':root') as HTMLElement;
      r.style.setProperty('--autofill', "#77777" );
    }
    else {

     const theme=localStorage['color-theme']
      r = document.querySelector(`.${theme}`) as HTMLElement;
      r.style.setProperty('--autofill', color );
    }
      
      }

  updateTheme() {
    if (localStorage['theme'] === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      this.isDarkMode = true;
     
   this.setAutofill('')
    } else {
      document.documentElement.classList.remove('dark')
      this.isDarkMode = false;
      this.setAutofill('white')
    }
  }

  toggleTheme(theme:string): void {
    localStorage['theme'] = theme
    this.updateTheme()
  }

  useOSPreference () {
    localStorage.removeItem('theme')
    this.updateTheme()
  }


}
