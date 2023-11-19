import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import io from 'socket.io-client'



@Injectable({
  providedIn: 'root'
})

export class WebSocketService {

  io = io('http://localhost:8080', {
    transports: ['websocket'],
    withCredentials: true,
    autoConnect: true
  })

  constructor() { }

}

