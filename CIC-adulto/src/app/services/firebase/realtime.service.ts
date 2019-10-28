import { Injectable } from '@angular/core';
//Observables
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {
  //observable screen1
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

  getForm(itemsRef: any){
    return itemsRef.snapshotChanges();
  }
  createForm(itemsRef:any ,newObject: any) {
    return itemsRef.push(newObject);
  }
  updateForm(itemsRef: any, key: string, newObject: any) {
    return itemsRef.update(key, newObject);
  }
  deleteForm(itemsRef: any, key: string) {
    return itemsRef.remove(key);
  }
  deleteForms(itemsRef: any) {
    return itemsRef.remove();
  }

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
}
