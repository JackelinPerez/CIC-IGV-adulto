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
import { RxjsService} from '../../services/rxjs/rxjs.service';

@Component({
  selector: 'app-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.css']
})
export class Screen1Component implements OnInit {

  checkoutForm_: Form01 = {
    salud: '',
    ropa: '',
    calzado: '',
    electro: '',
    cines: '',
    restaurantes: '',
    bares: '',
    discotecas: '',
    luz: '',
    agua: '',
    telefonoFijo: '',
    telefonoMovil: '',
  };
  checkoutForm; 
  public newFormIndp = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    id: new FormControl(''),
  });

  constructor(
    private formBuilder:FormBuilder,
    private router: Router,
    private rxjsService:RxjsService,
  ) { 
    this.checkoutForm = this.formBuilder.group(this.checkoutForm_);  
  }

  ngOnInit() {
  }

  onSubmit(customerData:any) {
    this.rxjsService.changeScreen1({...customerData});
    this.router.navigateByUrl('/pantalla_2');    
  }
}
