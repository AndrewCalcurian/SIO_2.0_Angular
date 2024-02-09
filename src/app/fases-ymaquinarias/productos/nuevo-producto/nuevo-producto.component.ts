import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.scss']
})
export class NuevoProductoComponent implements OnInit{


  @Input() nuevo:any;
  @Output() onCloseModal = new EventEmitter()

  ngOnInit(): void {
    this.updateCarousel();
  }

currentPanel = 1;
panelWidth = 1100; // Largura de cada painel
totalPanels = 8; // Número total de painéis

changePanel(direction) {
    this.currentPanel += direction;

    if (this.currentPanel < 1) {
        this.currentPanel = this.totalPanels;
    } else if (this.currentPanel > this.totalPanels) {
        this.currentPanel = 1;
    }

    this.updateCarousel();
}

updateCarousel() {
    let carousel:any = document.getElementById('carousel');
    let panelContainer:any = document.querySelector('.carousel-container');
    const translateValue = -this.panelWidth * (this.currentPanel - 1);
    carousel.style.transform = `translateX(${translateValue}px)`;
    panelContainer.style.width = `${this.panelWidth}px`; // Ajuste a largura do contêiner para mostrar apenas um painel
}

cerrar(){
  this.onCloseModal.emit()
}
}
