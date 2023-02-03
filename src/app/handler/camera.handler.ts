import { CameraService } from "../service/camera.service";

export class CameraHandler {

    private horizontalHint: HTMLElement;
    private verticalHint: HTMLElement;

    constructor(
        private cameraService: CameraService,
        private rangeHorizontal: HTMLInputElement,
        private rangeVertical: HTMLInputElement,
        private checkFlashlight: HTMLInputElement,
        private checkInvHor: HTMLInputElement,
        private checkInvVer: HTMLInputElement
    ) {
        this.rangeHorizontal.addEventListener('change', (event) => this.horizontalChange());
        this.rangeVertical.addEventListener('change', (event) => this.verticalChange());
        this.checkFlashlight.addEventListener('change', (event) => this.flashlightChange());

        this.horizontalHint = <HTMLElement>this.rangeHorizontal.nextSibling?.nextSibling;
        this.verticalHint = <HTMLElement>this.rangeVertical.nextSibling?.nextSibling;
    }

    flashlightChange(): void {
        this.cameraService.setFlashlight(this.checkFlashlight.checked);
    }

    horizontalChange(): void {
        this.horizontalHint.innerHTML = this.rangeHorizontal.value + '&deg;';
        this.updateAngles();
    } 

    verticalChange(): void {
        this.verticalHint.innerHTML = this.rangeVertical.value + '&deg;';
        this.updateAngles();
    }

    updateAngles(): void {
        let hor = parseInt(this.rangeHorizontal.value);
        let ver = parseInt(this.rangeVertical.value);
        if (this.checkInvHor.checked) hor = -hor;
        if (this.checkInvVer.checked) ver = -ver;
        this.cameraService
            .setAngle(hor + 90, ver + 90)
            .then(
                response => console.log(response),
                error => console.error(error)
            );
    }

}