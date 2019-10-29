import { Component, OnInit } from '@angular/core';
//incluyendo routher
import { Router } from '@angular/router';

//incluyendo servicio
import { RealtimeService} from '../../services/firebase/realtime.service';
import { RxjsService} from '../../services/rxjs/rxjs.service';

// //imcluyendo clases form
// import { Exit} from '../../models/exit';

//incluyendo formulario
import { FormBuilder} from '@angular/forms';
// agregando formulario
import { FormControl, FormGroup, Validators } from '@angular/forms';

//incluyendo angular
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Component({
  selector: 'app-screen3',
  templateUrl: './screen3.component.html',
  styleUrls: ['./screen3.component.css']
})
export class Screen3Component implements OnInit {

  controlInput = 0;
  result_total:any;

  checkoutForm_: any = {
    aporte_voluntario: ''
  };
  checkoutForm; 
  public newFormIndp = new FormGroup({
    nombre: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
    id: new FormControl(''),
  });
  //obteniendo propiedad del servicio de firebase Realtime
  itemsRef: AngularFireList<any>;

  constructor(
    private router: Router,
    private rxjsService:RxjsService,
    private formBuilder:FormBuilder,
    private db: AngularFireDatabase,
    private realtimeService:RealtimeService
  ) {
    this.checkoutForm = this.formBuilder.group(this.checkoutForm_);
    this.itemsRef = db.list('formulario');
   }

  ngOnInit() {

  }
  acepto() {
    this.controlInput = 1;
  }

  rechazo() {
    this.rxjsService.currentForm2.subscribe((result2 :any)=>{
      this.realtimeService.createForm(this.itemsRef , {...result2}); 
    });
    this.router.navigateByUrl('/pantalla_0');
  }

  onSubmit(customerData:any){
    let ganancia_igv2_pension = 0;
    let pension_igv2 = 0;
    
    this.rxjsService.currentForm2.subscribe((result2 :any)=>{
      this.result_total= {...result2};
      const aporte_voluntario = parseInt(customerData.aporte_voluntario);

      if(this.result_total.ganancia_igv2_mensual!==NaN){
        ganancia_igv2_pension = (65- this.result_total.edad)*12*(this.result_total.ganancia_igv2_mensual + aporte_voluntario);
        pension_igv2 = ganancia_igv2_pension/120;
      }

      const exitPension = {...this.result_total, aporte_voluntario, ganancia_igv2_pension, pension_igv2};
      
      this.realtimeService.createForm(this.itemsRef , {...exitPension});
      this.rxjsService.changeScreen3({...exitPension});
      
      console.log('por aqui!-----------------------');
      Object.keys(this.result_total).forEach(ele => {
        console.log(ele +': '+this.result_total[ele]);
      });
    });

    

    this.router.navigateByUrl('/pantalla_4');
  }
}
