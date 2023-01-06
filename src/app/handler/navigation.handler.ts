import { NavigationService } from "../service/navigation.service";

export class NavigationHandler {

    private control_n: HTMLElement;
    private control_ne: HTMLElement;
    private control_nw: HTMLElement;
    private control_w: HTMLElement;
    private control_e: HTMLElement;
    private control_s: HTMLElement;
    private control_se: HTMLElement;
    private control_sw: HTMLElement;

    private btnToggle: HTMLElement;
    private innerContainer: HTMLElement;

    private directSpeedHint: HTMLElement;
    private turningSpeedHint: HTMLElement;

    private visible = true;

    constructor(
        private navigationService: NavigationService, 
        controlsBox: HTMLElement,
        private rangeDirectSpeed: HTMLInputElement,
        private rangeTurningSpeed: HTMLInputElement
    ) {
        this.control_n = <HTMLElement>controlsBox.querySelector(".N");
        this.control_ne = <HTMLElement>controlsBox.querySelector(".NE");
        this.control_nw = <HTMLElement>controlsBox.querySelector(".NW");

        this.control_e = <HTMLElement>controlsBox.querySelector(".E");
        this.control_w = <HTMLElement>controlsBox.querySelector(".W");

        this.control_s = <HTMLElement>controlsBox.querySelector(".S");
        this.control_se = <HTMLElement>controlsBox.querySelector(".SE");
        this.control_sw = <HTMLElement>controlsBox.querySelector(".SW");

        this.btnToggle = <HTMLElement>controlsBox.querySelector(".box__toggle");
        this.innerContainer = <HTMLElement>controlsBox.querySelector(".navigation__inner");

        this.directSpeedHint = <HTMLElement>this.rangeDirectSpeed.nextSibling?.nextSibling;
        this.turningSpeedHint = <HTMLElement>this.rangeTurningSpeed.nextSibling?.nextSibling;

        this.registerEvents();
    }

    private registerEvents() {
        this.registerEvent(this.control_n, 1, 0);
        this.registerEvent(this.control_ne, 1, 1);
        this.registerEvent(this.control_nw, 1, -1);

        this.registerEvent(this.control_e, 0, 1);
        this.registerEvent(this.control_w, 0, -1);

        this.registerEvent(this.control_s, -1, 0);
        this.registerEvent(this.control_se, -1, 1);
        this.registerEvent(this.control_sw, -1, -1);

        this.rangeDirectSpeed.addEventListener('change', (event) => this.directSpeedChange());
        this.rangeTurningSpeed.addEventListener('change', (event) => this.turningSpeedChange());
        this.btnToggle.addEventListener('click', (event) => this.toggleView());
    }

    private toggleView(): any {
        this.visible = !this.visible;
        if (this.visible) {
            this.btnToggle.innerHTML = '&#5169;';
            this.innerContainer.style.display = 'flex';
        } else {
            this.btnToggle.innerHTML = '&#5167;';
            this.innerContainer.style.display = 'none';
        }
    }

    private registerEvent(control: HTMLElement, vertical: number, horizontal: number) {
        const functionActivated = (event: Event) => this.activateMotion(event, control, vertical, horizontal);
        const functionDeactivated = () => this.deactivateMotion(control);
        control.addEventListener('touchstart', functionActivated);
        control.addEventListener('mousedown', functionActivated);
        control.addEventListener('touchend', functionDeactivated);
        control.addEventListener('mouseup', functionDeactivated);
    }

    private activateMotion(event: Event, control: HTMLElement, vertical: number, horizontal: number): void {
        event.preventDefault();
        event.stopImmediatePropagation();
        control.classList.add('control--pressed');
        this.setMotion(vertical, horizontal);
    }

    private deactivateMotion(control: HTMLElement): void {
        control.classList.remove('control--pressed');
        this.navigationService.stop().then(
            response => console.log(response),
            error => console.error(error)
        );
    }

    private setMotion(vertical: number, horizontal: number): void {
        let leftPWM = 0, rightPWM = 0;
        let leftForward = false, rightForward = false;

        const directPwm = Math.round(parseInt(this.rangeDirectSpeed.value) * 2.55);
        const turningPwm = Math.round(parseInt(this.rangeTurningSpeed.value) * 2.55);
        
        if (vertical == 0) { // Just turning
            leftPWM = rightPWM = turningPwm;
            leftForward = horizontal > 0;
            rightForward = !leftForward;
        } else {
            leftForward = rightForward = (vertical > 0);
            leftPWM = rightPWM = directPwm;

            if (horizontal > 0) { // Steering
                rightPWM -= 50; // TODO adjust speed differential
            } else if (horizontal < 0) {
                leftPWM -= 50; // TODO adjust speed differential
            } 
        }

        this.navigationService.setSpeed(leftForward, leftPWM, rightForward, rightPWM).then(
            response => console.log(response),
            error => console.error(error)
        );
    }

    private directSpeedChange(): void {
        this.directSpeedHint.textContent = this.rangeDirectSpeed.value + '%';
    }

    private turningSpeedChange(): void {
        this.turningSpeedHint.textContent = this.rangeTurningSpeed.value  + '%';
    }

}