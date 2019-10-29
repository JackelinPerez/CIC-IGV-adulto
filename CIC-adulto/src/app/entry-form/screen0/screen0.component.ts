import { Component, OnInit } from '@angular/core';

//incluyendo routher
import { Router } from '@angular/router';

//incluyendo formulario
import { FormBuilder} from '@angular/forms';
// agregando formulario
import { FormControl, FormGroup, Validators } from '@angular/forms';
//imcluyendo clases form
import { Form00} from '../../models/form00';

//incluyendo servicio
import { RealtimeService} from '../../services/firebase/realtime.service';
import { RxjsService} from '../../services/rxjs/rxjs.service';

//incluyendo angular
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Component({
  selector: 'app-screen0',
  templateUrl: './screen0.component.html',
  styleUrls: ['./screen0.component.css']
})
export class Screen0Component implements OnInit {

  checkoutForm_: Form00 = {
    nombre: '',
    edad: '',
  };
  checkoutForm; 
  public newFormIndp = new FormGroup({
    nombre: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
    id: new FormControl(''),
  });
  //obteniendo propiedad del servicio de firebase Realtime
  // itemsRef: AngularFireList<any>;

  constructor(
    private formBuilder:FormBuilder,
    private router: Router,
    // private realtimeService:RealtimeService,
    private rxjsService:RxjsService,
    // private db: AngularFireDatabase
  ) {
    this.checkoutForm = this.formBuilder.group(this.checkoutForm_);
    // this.itemsRef = db.list('formulario');
  }

  ngOnInit() {
  }
  onSubmit(customerDataAux:any) {
    const customerData = Object.keys(customerDataAux).reduce((acum, ele )=>{
      acum[ele] = customerDataAux[ele];
      if(customerDataAux[ele] === NaN)
      acum[ele] = 0;
      return acum;
    },{});
    this.rxjsService.changeScreen0({...customerData});
    // this.realtimeService.createForm(this.itemsRef , {...customerData});
    this.router.navigateByUrl('/pantalla_1');    
  }
}
