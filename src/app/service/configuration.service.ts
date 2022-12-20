import { HttpService } from "./http.service";

export class ConfigurationService {

    constructor(private httpService: HttpService) {
    }

    public configureStreaming(param: string, value: string): Promise<string> {
        return this.httpService.get(`/control?var=${param}&val=${value}`);
    }

}