import { ConfigurationService } from "../service/configuration.service";

export class ConfigurationHandler {

    constructor(
        private txtIpAddress: HTMLInputElement,
        private cmbFrameSize: HTMLInputElement,
        private configurationService: ConfigurationService,
        private ipChangedCallback: Function
    ) {
        txtIpAddress.addEventListener('change', (event) => this.setAlternativeIp());
        cmbFrameSize.addEventListener('change', (event) => this.setFrameSize())
    }

    setAlternativeIp() {
        const value = this.txtIpAddress.value;
        if (value && /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(value)) {
            this.ipChangedCallback(value);
        } else {
            this.ipChangedCallback('');
        }
    }

    setFrameSize() {
        const value = this.cmbFrameSize.value;
        this.configurationService.configureStreaming('framesize', value).then(
            response => console.log(response),
            error => console.error(error)
        );
    }

}