import { Component, OnInit } from '@angular/core';
import { VehicleInterface } from '../../interfaces/vehicles.interface';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleDialogComponent } from '../vehicle-dialog/vehicle-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'; // Importación correcta
import { MatButtonModule } from '@angular/material/button'; // Para usar botones Material

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [CommonModule, MatButtonModule], // Asegúrate de incluirlo aquí
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'] // Notar que es `styleUrls` (plural)
})
export class VehicleComponent implements OnInit {

  vehiclesList: VehicleInterface[] = [];
  constructor(
    private vehicleService: VehicleService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getVehicle();
  }

  getVehicle() {
    this.vehicleService.getVehicle().subscribe({
      next: (result) => {
        this.vehiclesList = result;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openDialog(vehicle?: VehicleInterface): void {
    const dialogRef = this.dialog.open(VehicleDialogComponent, {
      width: '400px',
      data: vehicle || { status: { name: '' } },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (vehicle) {
          this.updateVehicle(vehicle.id, result);
        } else {
          this.addVehicle(result);
        }
      }
    });
  }

  deleteVehicle(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este vehículo?')) {
      this.vehicleService.deleteVehicle(id).subscribe(() => {
        alert('Vehículo eliminado con éxito');
        this.getVehicle();
      });
    }
  }

  private addVehicle(vehicle: VehicleInterface): void {
    this.vehicleService.addVehicle(vehicle).subscribe(() => {
      alert('Vehículo agregado con éxito');
      this.getVehicle();
    });
  }

  private updateVehicle(id: number, vehicle: VehicleInterface): void {
    this.vehicleService.updateVehicle(id, vehicle).subscribe(() => {
      alert('Vehículo actualizado con éxito');
      this.getVehicle();
    });
  }
}
