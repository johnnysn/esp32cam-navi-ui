# Esp32-CAM Navi UI

This project consists of a web application designed to be served by an ESP32-CAM that is capable of receiving navigation and camera positioning commands.

## Installation

Navigate to the project folder and use the package manager [npm](https://www.npmjs.com/) to install the project dependencies.

```bash
npm install
```

## Building 

In order to build the source code into static web assets, run:

```bash
npm run build
```

This process will generate the js and css files and put them into the public/assets folder, so the public/index.html can work properly on the browser.

## Distributing

In order to generate a single html file to be easily embbeded into the Esp32-CAM, it will be required to install the gulp client:

```bash
npm install -g gulp
```

Then, you can run:

```bash
gulp
```

or:

```bash
npm dist
```

and the resulting html file will be generated and put into the dist folder.

## License

[MIT](https://choosealicense.com/licenses/mit/)