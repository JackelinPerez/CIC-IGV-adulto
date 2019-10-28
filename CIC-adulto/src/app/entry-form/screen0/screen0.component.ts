import { Component, OnInit } from '@angular/core';

//incluyendo routher
import { Router } from '@angular/router';

//incluyendo formulario
import { FormBuilder} from '@angular/forms';
// agregando formulario
import { FormControl, FormGroup, Validators } from '@angular/forms';
//imcluyendo clases form
import { Form01} from '../../models/form01';

//incluyendo servicio
import { RealtimeService} from '../../services/firebase/realtime.service';

//incluyendo angular
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Component({
  selector: 'app-screen0',
  templateUrl: './screen0.component.html',
  styleUrls: ['./screen0.component.css']
})
export class Screen0Component implements OnInit {

  checkoutForm_: Form01 = {
    name: '',
    age: '',
  };
  public newFormIndp = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    id: new FormControl(''),
  });
  //obteniendo propiedad del servicio de firebase Realtime
  itemsRef: AngularFireList<any>;

  checkoutForm; 
  constructor(
    private formBuilder:FormBuilder,
    private router: Router,
    private realtimeService:RealtimeService,
    private db: AngularFireDatabase
  ) {
    this.checkoutForm = this.formBuilder.group(this.checkoutForm_);
    this.itemsRef = db.list('formulario');
  }

  ngOnInit() {
  }
  onSubmit(customerData:any) {
    this.realtimeService.changeScreen0({...customerData});
    this.realtimeService.createForm(this.itemsRef , {...customerData});
    this.router.navigateByUrl('/pantalla_1');    
  }
}
