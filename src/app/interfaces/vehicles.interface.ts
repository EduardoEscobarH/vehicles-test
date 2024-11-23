export interface VehicleInterface{
    "id": number;
        "vin": string;
        "licensePlate":string;
        "model": string;
        "status": status;
}

export interface status{
    "id": number;
    "name": string;
}
