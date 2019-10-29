import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {
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
}
