# Problems

* typescript files are not being debugged.
* Had to remove 'externals' section from webpack.

## Here is the tutorial

[medium](https://medium.com/@paulirwin/getting-started-with-electron-and-visual-studio-code-typescript-and-react-36d41b68fadb)
[typescriptlan](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)
[VSCode Debug Electron](https://github.com/Microsoft/vscode-recipes/tree/master/Electron)

## Set up

``` bash

git clone https://github.com/electron/electron-quick-start myelectronapp

cd myelectronapp

npm install

npm install -g electron

```

## To Typescript and React

``` bash

sudo npm install -g typescript webpack

npm install --save react react-dom

npm install --save-dev ts-loader source-map-loader

sudo npm link typescript

npm install --save @types/react
#typings install --global --save dt~react

npm install --save @types/react-dom
#typings install --global --save dt~react-dom

sudo npm link webpack

```
