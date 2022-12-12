import { CameraHandler } from "./handler/camera.handler";
import { CameraService } from "./service/camera.service";
import { NavigationService } from "./service/navigation.service";

const cameraService = new CameraService();
const navigationService = new NavigationService();

const rangeHorizontal = <HTMLInputElement>document.querySelector('#rangeHorizontal');
const rangeVertical = <HTMLInputElement>document.querySelector('#rangeVertical');

const cameraHandler = new CameraHandler(cameraService, rangeHorizontal, rangeVertical);
