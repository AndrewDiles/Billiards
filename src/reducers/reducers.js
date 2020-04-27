import userInfo from './userInfo-reducer';
import settings from './settings-reducer';
import billiards from './billiards-reducer';

import { combineReducers } from 'redux';

export default combineReducers({ userInfo, settings, billiards });