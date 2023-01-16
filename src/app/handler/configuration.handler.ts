import { env } from "../env";
import { ConfigurationService } from "../service/configuration.service";
import { StreamingHandler } from "./streaming.handler";

export class ConfigurationHandler {

    constructor(
        private txtIpAddress: HTMLInputElement,
        private cmbFrameSize: HTMLInputElement,
        private configurationService: ConfigurationService,
        private streamingHandler: StreamingHandler
    ) {
        txtIpAddress.addEventListener('change', (event) => this.setAlternativeIp());
        cmbFrameSize.addEventListener('change', (event) => this.setFrameSize())
    }

    setAlternativeIp() {
        const value = this.txtIpAddress.value;
        if (value && /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(value)) {
            env.alternative_base_uri = 'http://' + value;
        } else {
            env.alternative_base_uri = '';
        }
        this.streamingHandler.setupVideoStreaming();
    }

    setFrameSize() {
        const value = this.cmbFrameSize.value;
        this.configurationService.configureStreaming('framesize', value).then(
            response => console.log(response),
            error => console.error(error)
        );
    }

}