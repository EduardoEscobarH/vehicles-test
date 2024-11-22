import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VehicleComponent } from './components/vehicle/vehicle.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,VehicleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test';
}
