import { CameraService } from "../service/camera.service";

export class CameraHandler {

    private horizontalHint: HTMLElement;
    private verticalHint: HTMLElement;

    constructor(
        private cameraService: CameraService,
        private rangeHorizontal: HTMLInputElement,
        private rangeVertical: HTMLInputElement
    ) {
        this.rangeHorizontal.addEventListener('change', (event) => this.horizontalChange());
        this.rangeVertical.addEventListener('change', (event) => this.verticalChange());

        this.horizontalHint = <HTMLElement>this.rangeHorizontal.nextSibling?.nextSibling;
        this.verticalHint = <HTMLElement>this.rangeVertical.nextSibling?.nextSibling;
    }

    horizontalChange(): void {
        this.horizontalHint.textContent = this.rangeHorizontal.value + '°';
        this.updateAngles();
    } 

    verticalChange(): void {
        this.verticalHint.textContent = this.rangeVertical.value + '°';
        this.updateAngles();
    }

    updateAngles(): void {
        this.cameraService
            .setAngle(parseInt(this.rangeHorizontal.value) + 90, parseInt(this.rangeVertical.value) + 90)
            .then(
                response => console.log(response),
                error => console.error(error)
            );
    }

}