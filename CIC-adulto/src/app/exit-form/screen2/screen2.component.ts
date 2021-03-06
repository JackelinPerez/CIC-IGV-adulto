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
  ) { this.itemsRef = db.list('formulario_new');}

  ngOnInit() {
    this.rxjsService.currentForm1.subscribe((result1 :any)=>{
      this.rxjsService.currentForm0.subscribe((result0 :any)=>{
        this.exit = this.exitScreen2(result1, result0);
        this.exitString = this.rxjsService.convertionTostring(this.exit);
        this.resultTotal = {... result0, ... this.exit, consumo: {...result1}};
      });
    });

    // console.log('-----------------------------------------');
    // Object.keys(this.resultTotal).forEach(ele => {
    //   console.log(ele +': '+this.resultTotal[ele]);
    // });
  }


  exitScreen2(result01:any, result00:any){
    let ganancia_igv2_pension = 0;
    let pension_igv2 = 0;
    let aporteMin_voluntario = 0;
    let aporte_voluntario = 0;

    const consumo_Mensual = Object.keys(result01).reduce((acum, ele )=>{
      acum = acum + parseInt(result01[ele]);
      return acum;
    },0);

    const ganancia_igv2_mensual = Object.keys(result01).reduce((acum, ele )=>{
      acum = acum + parseInt(result01[ele])*0.02;
      return acum;
    },0);


    if(ganancia_igv2_mensual !== 0) {
      ganancia_igv2_pension = (65- parseInt(result00.edad))*12*ganancia_igv2_mensual;
      pension_igv2 = this.rxjsService.calculatePension({edad: parseInt(result00.edad),aporte: ganancia_igv2_mensual}).igv; 
      aporteMin_voluntario = this.rxjsService.calculatePension({edad: parseInt(result00.edad),aporte: ganancia_igv2_mensual}).min; 
    }

    console.log('Gasto total= '+consumo_Mensual);

    return{
      consumo_Mensual,
      ganancia_igv2_mensual,
      ganancia_igv2_pension,
      pension_igv2,
      aporteMin_voluntario,
      aporte_voluntario
    };
  }

  // convertionTostring(objNumber: any){
  //   let objNumberAux: any = {...objNumber};
  //   let statusOK: any = {};
  //   Object.keys(objNumberAux).forEach(ele => {
  //     statusOK[ele] = objNumberAux[ele].toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2});
  //   });
  //   return statusOK;
  // }

  // acepto() {
  //   this.realtimeService.createForm(this.itemsRef , {...this.resultTotal}); 
  //   this.router.navigateByUrl('/pantalla_0');
  // }

  // rechazo() {
  //   this.rxjsService.changeScreen2({...this.resultTotal});
  //   this.router.navigateByUrl('/pantalla_3');    
  // }

  siguiente(){
    this.rxjsService.changeScreen2({...this.resultTotal});
    this.router.navigateByUrl('/pantalla_3');     
  }
}
