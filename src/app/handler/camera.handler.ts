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
        console.log(this.rangeHorizontal.value);
        this.horizontalHint.textContent = this.rangeHorizontal.value + '';
    } 

    verticalChange(): void {
        console.log(this.rangeVertical.value);
        this.verticalHint.textContent = this.rangeVertical.value + '';
    } 

}