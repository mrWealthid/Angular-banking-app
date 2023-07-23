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


  updateTheme() {
    if (localStorage['theme'] === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      this.isDarkMode = true;
    } else {
      document.documentElement.classList.remove('dark')
      this.isDarkMode = false;
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
