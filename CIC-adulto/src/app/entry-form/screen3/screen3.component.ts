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
  aporteMinimo:any;

  checkoutForm_: any = {
    aporte_voluntario: '',
    voluntaryContributions: ''
  };

  voluntaryContributions: any[] = [
    { value: 50 },
    { value: 80 },
    { value: 110 },
 ];

 disbursementYears_:any = 'N° ';

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
    this.itemsRef = db.list('formulario_new');
   }

  ngOnInit() {
    this.rxjsService.currentForm2.subscribe((result2 :any)=>{
      this.result_total= {...result2};
      this.aporteMinimo = this.rxjsService.convertionTostring({...result2}).aporteMin_voluntario;
    })
  }

  acepto() {
    this.controlInput = 1;
  }

  rechazo() {
    this.realtimeService.createForm(this.itemsRef , {...this.result_total, aporteFacultativo: 'No'}); 
    this.router.navigateByUrl('/pantalla_0');
  }

  acepto_() {
    this.controlInput = 2;
  }

  rechazo_() {
    this.realtimeService.createForm(this.itemsRef , {...this.result_total, aporteFacultativo: 'Si'}); 
    this.router.navigateByUrl('/pantalla_0');
  }  

  // onChangeYearsDisbursement(newValue:any){
  //   this.disbursementYears_ = newValue;
  //   console.log('valor selec= ' + this.disbursementYears_);
    
  // }   

  onSubmit(customerData:any){
    let ganancia_igv2_pension = 0;
    let pension_igv2 = 0;
    
    // this.rxjsService.currentForm2.subscribe((result2 :any)=>{
      // this.result_total= {...result2};
      const aporte_voluntario = parseInt(customerData.aporte_voluntario);

      if(this.result_total.ganancia_igv2_mensual!==NaN){
        // ganancia_igv2_pension = (65- this.result_total.edad)*12*(this.result_total.ganancia_igv2_mensual + aporte_voluntario);
        // pension_igv2 = ganancia_igv2_pension/120;
        pension_igv2 = this.rxjsService.calculatePension({
          edad: this.result_total.edad,
          aporte: this.result_total.ganancia_igv2_mensual + aporte_voluntario}).igv;
      }

      const exitPension = {...this.result_total, aporte_voluntario, ganancia_igv2_pension, pension_igv2, aporteFacultativo: 'Si'};
      
      this.realtimeService.createForm(this.itemsRef , {...exitPension});
      this.rxjsService.changeScreen3({...exitPension});
      
      // console.log('por aqui!-----------------------');
      // Object.keys(this.result_total).forEach(ele => {
      //   console.log(ele +': '+this.result_total[ele]);
      // });
    // });

    this.router.navigateByUrl('/pantalla_4');
  }
}
