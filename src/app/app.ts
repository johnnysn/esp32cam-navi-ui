import { env } from "./env";
import { CameraHandler } from "./handler/camera.handler";
import { NavigationHandler } from "./handler/navigation.handler";
import { CameraService } from "./service/camera.service";
import { HttpService } from "./service/http.service";
import { NavigationService } from "./service/navigation.service";

const httpService = new HttpService();
const cameraService = new CameraService(httpService);
const navigationService = new NavigationService(httpService);

const rangeHorizontal = <HTMLInputElement>document.querySelector('#rangeHorizontal');
const rangeVertical = <HTMLInputElement>document.querySelector('#rangeVertical');

const cameraHandler = new CameraHandler(cameraService, rangeHorizontal, rangeVertical);

const navigationContainer = <HTMLElement>document.querySelector('.navigation__controls');
const rangeDirectSpeed = <HTMLInputElement>document.querySelector('#rangeDirectSpeed');
const rangeTurningSpeed = <HTMLInputElement>document.querySelector('#rangeTurningSpeed');

const navigationHandler = new NavigationHandler(navigationService, navigationContainer, rangeDirectSpeed, rangeTurningSpeed);

// Setting up video streaming
const viewport = <HTMLImageElement>document.querySelector('#streaming-viewport');
viewport.src = env.streaming_uri;
