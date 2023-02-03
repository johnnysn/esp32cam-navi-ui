import { env } from "./env";
import { CameraHandler } from "./handler/camera.handler";
import { ConfigurationHandler } from "./handler/configuration.handler";
import { NavigationHandler } from "./handler/navigation.handler";
import { StreamingHandler } from "./handler/streaming.handler";
import { CameraService } from "./service/camera.service";
import { ConfigurationService } from "./service/configuration.service";
import { HttpService } from "./service/http.service";
import { NavigationService } from "./service/navigation.service";

// Instantiating services
const httpService = new HttpService();
const cameraService = new CameraService(httpService);
const navigationService = new NavigationService(httpService);
const configurationService = new ConfigurationService(httpService);

// Camera handler
const rangeHorizontal = <HTMLInputElement>document.querySelector('#rangeHorizontal');
const rangeVertical = <HTMLInputElement>document.querySelector('#rangeVertical');
const checkFlashlight = <HTMLInputElement>document.querySelector('#chkFlashlight');
const checkInvHor = <HTMLInputElement>document.querySelector('#chkInvHor');
const checkInvVer = <HTMLInputElement>document.querySelector('#chkInvVer');
const cameraHandler = new CameraHandler(cameraService, rangeHorizontal, rangeVertical, checkFlashlight, checkInvHor, checkInvVer);

// Navigation handler
const navigationContainer = <HTMLElement>document.querySelector('#navigationBox');
const rangeDirectSpeed = <HTMLInputElement>document.querySelector('#rangeDirectSpeed');
const rangeTurningSpeed = <HTMLInputElement>document.querySelector('#rangeTurningSpeed');
const navigationHandler = new NavigationHandler(navigationService, navigationContainer, rangeDirectSpeed, rangeTurningSpeed);

// Streaming handler
const viewport = <HTMLImageElement>document.querySelector('#streaming-viewport');
const waitingElement = <HTMLImageElement>document.querySelector('#streaming-waiting');
const streamingHandler = new StreamingHandler(viewport, waitingElement);

// Configuration handler
const txtIpAddress = <HTMLInputElement>document.querySelector('#txtIpAddress');
const cmbFrameSize = <HTMLInputElement>document.querySelector('#cmbFrameSize');
const configurationHandler = new ConfigurationHandler(txtIpAddress, cmbFrameSize, configurationService, streamingHandler);

