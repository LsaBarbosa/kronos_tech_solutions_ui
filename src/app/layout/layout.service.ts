import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  // O BehaviorSubject armazena o estado atual e o transmite para os assinantes
  private sidebarOpenSubject = new BehaviorSubject<boolean>(false);
  
  constructor() { }

  // Retorna o estado atual da barra lateral como um Observable
  isSidebarOpen(): Observable<boolean> {
    return this.sidebarOpenSubject.asObservable();
  }

  // Alterna o estado da barra lateral
  toggleSidebar(): void {
    this.sidebarOpenSubject.next(!this.sidebarOpenSubject.value);
  }
}
