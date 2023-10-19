import { Component } from '@angular/core';
import { FabricantesService } from 'src/app/services/fabricantes.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent {

  constructor(public api:FabricantesService){
    
  }

}
