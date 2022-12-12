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

    constructor(private navigationService: NavigationService, private controlsContainer: HTMLElement) {
        this.control_n = <HTMLElement>controlsContainer.querySelector(".N");
        this.control_ne = <HTMLElement>controlsContainer.querySelector(".NE");
        this.control_nw = <HTMLElement>controlsContainer.querySelector(".NW");

        this.control_e = <HTMLElement>controlsContainer.querySelector(".E");
        this.control_w = <HTMLElement>controlsContainer.querySelector(".W");

        this.control_s = <HTMLElement>controlsContainer.querySelector(".S");
        this.control_se = <HTMLElement>controlsContainer.querySelector(".SE");
        this.control_sw = <HTMLElement>controlsContainer.querySelector(".SW");

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
        console.log('Move: ' + vertical + ',' + horizontal);
    }

    private deactivateMotion(control: HTMLElement): void {
        control.classList.remove('control--pressed');
        console.log('Stop');
    }

}