import { env } from "../env";

export class StreamingHandler {

    constructor(private viewport: HTMLImageElement, private waitingElement: HTMLElement) {
        this.viewport.style.display = 'none';
        this.waitingElement.style.display = 'block';

        this.viewport.addEventListener('error', () => {
            console.log('Streaming error');
            this.viewport.style.display = 'none';
            this.waitingElement.style.display = 'block';
        });
        this.setupVideoStreaming();
    }

    setupVideoStreaming() {
        console.log('Location origin: ' + location.origin);
        const streamingUrl = (env.alternative_base_uri || location.origin) + ':' + env.streaming_port + env.streaming_uri;
        this.viewport.src = streamingUrl;

        this.viewport.style.display = 'block';
        this.waitingElement.style.display = 'none';
    
        console.log('Streaming url: ' + streamingUrl);
    }

}