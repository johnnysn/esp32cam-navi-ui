export class ConfigurationHandler {

    constructor(
        private txtIpAddress: HTMLInputElement,
        private ipChangedCallback: Function
    ) {
        txtIpAddress.addEventListener('change', (event) => this.setAlternativeIp());
    }

    setAlternativeIp() {
        const value = this.txtIpAddress.value;
        if (value && /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(value)) {
            this.ipChangedCallback(value);
        } else {
            this.ipChangedCallback('');
        }
    }

}