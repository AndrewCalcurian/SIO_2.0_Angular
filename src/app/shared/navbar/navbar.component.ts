import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public router:Router) {}

  public Menu_:any = []
  public empresa = false;

  ngOnInit(): void {
  }

  Menu:boolean = false;
  Solicitud_Material:boolean = false;

  showMenu(){
    this.Menu = true;
  }

  cerrarMenu(){
    this.Menu = false;
  }

  select_menu(n){
    this.Menu_ = [];
    this.Menu_[n] = true;
    this.empresa = false
  }

  showEmpresa(){
    this.empresa = true;
  }
}
