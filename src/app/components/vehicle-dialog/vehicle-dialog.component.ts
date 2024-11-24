import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; // Asegúrate de importar MatSelectModule
import { VehicleInterface } from '../../interfaces/vehicles.interface';

@Component({
  selector: 'app-vehicle-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.css'],
})
export class VehicleDialogComponent {

  ngOnInit(): void {
    if (this.data?.status?.id) {
      const matchedState = this.states.find((state) => state.id === this.data.status.id);
      if (matchedState) {
        this.data.status = matchedState;
      }
    }
  }

  states = [
    {
      id: 1,
      name: "ACTIVO",
    },{
      id: 2,
      name: "INACTIVO",
    }
  ]

  constructor(
    public dialogRef: MatDialogRef<VehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VehicleInterface
  ) {}

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
