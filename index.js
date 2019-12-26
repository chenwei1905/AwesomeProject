/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppContainer from './src/navigators/routes';
import App from './App';
import {name as appName} from './app.json';
import Testing from './src/Testing';
import Notice from "./src/pages/notice";

AppRegistry.registerComponent(appName, () => AppContainer);
