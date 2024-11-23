  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { VehicleInterface } from '../interfaces/vehicles.interface';

  @Injectable({
    providedIn: 'root'
  })
  export class VehicleService {
    API_URL: string="https://profound-warmth-production-5b71.up.railway.app/api/vehicles";

    constructor( private http: HttpClient) {
    }

    getVehicle(): Observable<any> {
      return this.http.get(this.API_URL).pipe(res=>res);
    }

    addVehicle(vehicle: any): Observable<any> {
      return this.http.post<any>(this.API_URL, vehicle);
    }

    updateVehicle(id: number, vehicle: VehicleInterface): Observable<VehicleInterface> {
      return this.http.put<VehicleInterface>(`${this.API_URL}/${id}`, vehicle);
    }

    deleteVehicle(id: number): Observable<void> {
      return this.http.delete<void>(`${this.API_URL}/${id}`);
    }

  }
