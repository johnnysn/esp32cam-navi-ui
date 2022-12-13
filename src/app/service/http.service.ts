export class HttpService {

    public get<T>(uri: string): Promise<T> {
        return new Promise<T>(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', uri, true);
                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(<T>xhr.response);
                    } else {
                        reject({
                            status: xhr.status,
                            message: xhr.statusText
                          });
                    }
                };
                xhr.onerror = () => {
                    reject({
                        status: xhr.status,
                        message: xhr.statusText
                      });
                };
                xhr.send();
            }
        );
    }

}