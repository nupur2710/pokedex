import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router){
  }
  
  /**
   * Navigation to home on click of the Pokedex logo
   * @param event 
   */
  returnToHome(event){
    this.router.navigate(['/']);
  }
}
