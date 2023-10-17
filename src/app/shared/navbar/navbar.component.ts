import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public router:Router) {}

  ngOnInit(): void {
    console.log(this.router.url, '<-- la url')
  }

  Menu:boolean = false;

  showMenu(){
    this.Menu = true;
  }

  cerrarMenu(){
    this.Menu = false;
  }

}
