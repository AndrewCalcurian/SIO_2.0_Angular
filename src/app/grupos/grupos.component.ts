import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { GruposService } from '../services/grupos.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})

export class GruposComponent implements OnInit{

  
  constructor(){}

  ngOnInit(): void {

  }


}
