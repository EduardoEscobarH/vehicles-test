import { Component, Inject } from '@angular/core';
import { VehicleInterface } from '../../interfaces/vehicles.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';  // Asegúrate de importar MatSelectModule
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-vehicle-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.css'],
})
export class VehicleDialogComponent {

  states = [
    { name: 'ACTIVO' },
    { name: 'INACTIVO' },
  ];

  constructor(
    public dialogRef: MatDialogRef<VehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VehicleInterface
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
