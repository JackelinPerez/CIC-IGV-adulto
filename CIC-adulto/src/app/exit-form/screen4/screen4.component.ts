import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//incluyendo servicio
import { RealtimeService} from '../../services/firebase/realtime.service';
import { RxjsService} from '../../services/rxjs/rxjs.service';

//imcluyendo clases form
import { Exit} from '../../models/exit';

//incluyendo angular
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Component({
  selector: 'app-screen4',
  templateUrl: './screen4.component.html',
  styleUrls: ['./screen4.component.css']
})
export class Screen4Component implements OnInit {

  //obteniendo propiedad del servicio de firebase Realtime
  itemsRef: AngularFireList<any>;

  resultEnd : any;
  constructor(
    private router: Router,
    private rxjsService:RxjsService,
    private realtimeService:RealtimeService,
    private db: AngularFireDatabase,
  ) { this.itemsRef = db.list('formulario_new');}

  ngOnInit() {
    this.rxjsService.currentForm3.subscribe((resultTotal :any)=>{
      let statusOK: any = {};
      Object.keys(resultTotal).forEach(ele => {
        if(!resultTotal.nombre || !resultTotal.edad)
        statusOK[ele] = resultTotal[ele].toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2});
      });
      this.resultEnd = {... resultTotal, acumMouth: resultTotal.ganancia_igv2_mensual + resultTotal.aporte_voluntario};
    });    
  }

  end(){
    this.router.navigateByUrl('/pantalla_0'); 
  }

}
