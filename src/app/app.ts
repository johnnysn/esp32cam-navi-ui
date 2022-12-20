import { env } from "./env";
import { CameraHandler } from "./handler/camera.handler";
import { ConfigurationHandler } from "./handler/configuration.handler";
import { NavigationHandler } from "./handler/navigation.handler";
import { CameraService } from "./service/camera.service";
import { ConfigurationService } from "./service/configuration.service";
import { HttpService } from "./service/http.service";
import { NavigationService } from "./service/navigation.service";

const httpService = new HttpService();
const cameraService = new CameraService(httpService);
const navigationService = new NavigationService(httpService);
const configurationService = new ConfigurationService(httpService);

const rangeHorizontal = <HTMLInputElement>document.querySelector('#rangeHorizontal');
const rangeVertical = <HTMLInputElement>document.querySelector('#rangeVertical');

const cameraHandler = new CameraHandler(cameraService, rangeHorizontal, rangeVertical);

const navigationContainer = <HTMLElement>document.querySelector('.navigation__controls');
const rangeDirectSpeed = <HTMLInputElement>document.querySelector('#rangeDirectSpeed');
const rangeTurningSpeed = <HTMLInputElement>document.querySelector('#rangeTurningSpeed');

const navigationHandler = new NavigationHandler(navigationService, navigationContainer, rangeDirectSpeed, rangeTurningSpeed);

const txtIpAddress = <HTMLInputElement>document.querySelector('#txtIpAddress');
const cmbFrameSize = <HTMLInputElement>document.querySelector('#cmbFrameSize');
const configurationHandler = new ConfigurationHandler(txtIpAddress, cmbFrameSize, configurationService, (ip: string) => {
    env.alternative_base_uri = ip ? 'http://' + ip : '';
    setupVideoStreaming();
});

const viewport = <HTMLImageElement>document.querySelector('#streaming-viewport');

function setupVideoStreaming() {
    const streamingUrl = (env.alternative_base_uri ?? location.origin) + ':' + env.streaming_port + env.streaming_uri;
    viewport.src = streamingUrl;

    console.log('Streaming url: ' + streamingUrl);
}

setupVideoStreaming();

