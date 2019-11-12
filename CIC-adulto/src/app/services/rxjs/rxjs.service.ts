import { Injectable } from '@angular/core';
//Observables
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxjsService {
  //observable screen0
  private formScreen0 = new BehaviorSubject({});
  public currentForm0 = this.formScreen0.asObservable();

  //observable screen1
  private formScreen1 = new BehaviorSubject({});
  public currentForm1 = this.formScreen1.asObservable();
  
  //observable screen2
  private formScreen2 = new BehaviorSubject({});
  public currentForm2 = this.formScreen2.asObservable();
  
  //observable screen3
  private formScreen3 = new BehaviorSubject({});
  public currentForm3 = this.formScreen3.asObservable();

    //observable screen4
    private formScreen4 = new BehaviorSubject({});
    public currentForm4 = this.formScreen4.asObservable();

  constructor() { }

  changeScreen0(value: any){
    this.formScreen0.next(value);
  }

  changeScreen1(value: any){
    this.formScreen1.next(value);
  }

  changeScreen2(value: any){
    this.formScreen2.next(value);
  }

  changeScreen3(value: any){
    this.formScreen3.next(value);
  }
  
  changeScreen4(value: any){
    this.formScreen4.next(value);
  }

  convertionTostring(objNumber: any){
    let objNumberAux: any = {...objNumber};
    let statusOK: any = {};
    Object.keys(objNumberAux).forEach(ele => {
      statusOK[ele] = objNumberAux[ele].toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2});
    });
    return statusOK;
  }  

  calculatePension(dataUser:any){
    let mesesAportar = (65-dataUser.edad)*12;
    const interes = 0.03/12;
    const pensionMinima = 500;
    let pension = {
      igv: 0,
      min: 0
    };
    pension.igv =((dataUser.aporte)*(Math.pow((1+interes),mesesAportar)-1)/interes)/120;
    pension.min = ((pensionMinima*120*interes)/(Math.pow((1+interes),mesesAportar)-1))-dataUser.aporte;
    return pension;
  }

}
