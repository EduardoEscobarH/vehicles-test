  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { VehicleInterface } from '../interfaces/vehicles.interface';

  @Injectable({
    providedIn: 'root'
  })
  export class VehicleService {
    API_URL: string="https://profound-warmth-production-5b71.up.railway.app/api/vehicles";

    constructor( private httpClient: HttpClient) {
    }

    getVehicle(): Observable<any> {
      return this.httpClient.get(this.API_URL).pipe(res=>res);
    }

    addVehicle(vehicle: any): Observable<any> {
      return this.httpClient.post<any>(this.API_URL, vehicle);
    }

    updateVehicle(id: number, vehicle: VehicleInterface): Observable<VehicleInterface> {
      console.log("final:"  +vehicle.status.name)
      return this.httpClient.put<VehicleInterface>(`${this.API_URL}/${id}`, vehicle);
    }

    deleteVehicle(id: number): Observable<void> {
      return this.httpClient.delete<void>(`${this.API_URL}/${id}`);
    }

  }
