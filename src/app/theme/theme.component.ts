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
 r = document.querySelector(':root') as HTMLElement;
  ngOnInit(): void {


  



// Create a function for setting a variable value

  }

setAutofill(color:string) {
    // Set the value of variable --blue to another value (in this case "lightblue")
    this.r.style.setProperty('--autofill', color );
  }

  updateTheme() {
    if (localStorage['theme'] === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      this.isDarkMode = true;

      this.setAutofill('#777777')
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
