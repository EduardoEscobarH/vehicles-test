import { Component, OnInit } from '@angular/core';
import { VehicleInterface } from '../../interfaces/vehicles.interface';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleDialogComponent } from '../vehicle-dialog/vehicle-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
})
export class VehicleComponent implements OnInit {
  vehiclesList: VehicleInterface[] = [];
  vehicleToDelete: number | null = null;  // Variable para almacenar el id del vehículo a eliminar

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
      },
    });
  }

  openDialog(vehicle?: VehicleInterface): void {
    const dialogRef = this.dialog.open(VehicleDialogComponent, {
      width: '400px',
      data: vehicle || {
        vin: '',
        licensePlate: '',
        model: '',
        status: { id: null, name: '' },
      },
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

  openDeleteModal(id: number): void {
    this.vehicleToDelete = id;  // Guarda el id del vehículo a eliminar
    const modalElement = document.getElementById('deleteModal');

    if (modalElement) {
      const modal = new window.bootstrap.Modal(modalElement);  // Usamos 'new' para crear la instancia del modal
      modal.show();  // Muestra el modal de Bootstrap
    }
  }


  confirmDelete(): void {
    if (this.vehicleToDelete !== null) {
      this.vehicleService.deleteVehicle(this.vehicleToDelete).subscribe({
        next: () => {
          this.getVehicle();

          // Cerrar el modal utilizando el atributo de instancia Bootstrap
          const deleteModalElement = document.getElementById('deleteModal');
          if (deleteModalElement) {
            const modal = window.bootstrap.Modal.getInstance(deleteModalElement); // Recuperar la instancia existente
            if (modal) {
              modal.hide(); // Cerrar el modal
            }
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }


  addVehicle(vehicle: VehicleInterface): void {
    this.vehicleService.addVehicle(vehicle).subscribe({
      next: () => {
        this.showAlert('Vehículo agregado con éxito', 'success');
        this.getVehicle();
      },
      error: () => {
        this.showAlert('Error al agregar el vehículo', 'error');
      }
    });
  }

  updateVehicle(id: number, vehicle: VehicleInterface): void {
    this.vehicleService.updateVehicle(id, vehicle).subscribe({
      next: () => {
        this.showAlert('Vehículo actualizado con éxito', 'success');
        this.getVehicle();
      },
      error: () => {
        this.showAlert('Error al actualizar el vehículo', 'error');
      }
    });
  }

  alertMessage: string | null = null;
  alertClass: string = '';
  alertIcon: string = '';

  showAlert(message: string, type: 'success' | 'error'): void {
    this.alertMessage = message;
    if (type === 'success') {
      this.alertClass = 'alert-success';
      this.alertIcon = 'bi-check-circle';
    } else {
      this.alertClass = 'alert-danger';
      this.alertIcon = 'bi-exclamation-triangle';
    }

    setTimeout(() => this.closeAlert(), 5000);
  }

  closeAlert(): void {
    this.alertMessage = null;
  }
}
