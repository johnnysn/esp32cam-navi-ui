import { HttpService } from "./http.service";

export class CameraService {

    constructor(private httpService: HttpService) {}

    public setAngle(horizontalAngle: number, verticalAngle: number): Promise<string> {
        return this.httpService.get<string>(`/camera/${horizontalAngle}/${verticalAngle}`);
    }

}