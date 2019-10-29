import { Component, OnInit } from '@angular/core';
//incluyendo routher
import { Router } from '@angular/router';

//incluyendo servicio
import { RealtimeService} from '../../services/firebase/realtime.service';
import { RxjsService} from '../../services/rxjs/rxjs.service';

//imcluyendo clases form
import { Exit} from '../../models/exit';

//incluyendo angular
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';


@Component({
  selector: 'app-screen2',
  templateUrl: './screen2.component.html',
  styleUrls: ['./screen2.component.css']
})
export class Screen2Component implements OnInit {

  resultTotal: any;
  exit: Exit;
  exitString: any;
  //obteniendo propiedad del servicio de firebase Realtime
  itemsRef: AngularFireList<any>;

  constructor(
    private router: Router,
    private rxjsService:RxjsService,
    private realtimeService:RealtimeService,
    private db: AngularFireDatabase,
  ) { this.itemsRef = db.list('formulario');}

  ngOnInit() {
    this.rxjsService.currentForm1.subscribe((result1 :any)=>{
      this.rxjsService.currentForm0.subscribe((result0 :any)=>{
        this.exit = this.exitScreen2(result1, result0);
        this.exitString = this.convertionTostring(this.exit);
        this.resultTotal = {... result0, ... this.exit};
      });
    });

    console.log('-----------------------------------------');
    Object.keys(this.resultTotal).forEach(ele => {
      console.log(ele +': '+this.resultTotal[ele]);
    });
  }


  exitScreen2(result01:any, result00:any){
    const consumo_Mensual = Object.keys(result01).reduce((acum, ele )=>{
      acum = acum + parseInt(result01[ele]);
      return acum;
    },0);

    const ganancia_igv2_mensual = Object.keys(result01).reduce((acum, ele )=>{
      acum = acum + parseInt(result01[ele])*0.02;
      return acum;
    },0);


    const ganancia_igv2_pension = (65- parseInt(result00.edad))*12*ganancia_igv2_mensual;
    const pension_igv2 = ganancia_igv2_pension/120;
    const aporte_voluntario = 0;
    
    console.log('Gasto total= '+consumo_Mensual);
    return{
      consumo_Mensual,
      ganancia_igv2_mensual,
      ganancia_igv2_pension,
      pension_igv2,
      aporte_voluntario
    };
  }

  convertionTostring(objNumber: any){
    let objNumberAux: any = {...objNumber};
    let statusOK: any = {};
    Object.keys(objNumberAux).forEach(ele => {
      statusOK[ele] = objNumberAux[ele].toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2});
    });
    return statusOK;
  }

  acepto() {

    this.realtimeService.createForm(this.itemsRef , {...this.resultTotal}); 
    this.router.navigateByUrl('/pantalla_0');
  }

  rechazo() {
    this.rxjsService.changeScreen2({...this.resultTotal});
    this.router.navigateByUrl('/pantalla_3');    
  }
}
