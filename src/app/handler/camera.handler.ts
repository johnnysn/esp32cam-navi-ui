import { CameraService } from "../service/camera.service";

export class CameraHandler {

    constructor(
        private cameraService: CameraService,
        private rangeHorizontal: HTMLInputElement,
        private rangeVertical: HTMLInputElement
    ) {
        rangeHorizontal.onchange = this.horizontalChange;
        rangeVertical.onchange = this.verticalChange;
    }

    horizontalChange(): void {

    } 

    verticalChange(): void {
        
    } 

}