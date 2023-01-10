import { HttpService } from "./http.service";

export class CameraService {

    constructor(private httpService: HttpService) {}

    public setAngle(horizontalAngle: number, verticalAngle: number): Promise<string> {
        return this.httpService.get<string>(`/servo?hor=${horizontalAngle}&ver=${verticalAngle}`);
    }

    public setFlashlight(on: boolean): Promise<string> {
        return this.httpService.get<string>(`/flash?value=${on ? 1 : 0}`);
    }

}