import { HttpService } from "./http.service";

export class NavigationService {
    
    constructor(private httpService: HttpService) {}

    public stop(): Promise<string> {
        return this.httpService.get<string>('/stop');
    }

    public setSpeed(leftForward: boolean, pwmLeft: number, rightForward: boolean, pwmRight: number): Promise<string> {
        return this.httpService.get<string>(`/navi?dl=${leftForward ? 1 : 0}&sl=${pwmLeft}&dr=${rightForward ? 1 : 0}&sr=${pwmRight}`);
    }

}