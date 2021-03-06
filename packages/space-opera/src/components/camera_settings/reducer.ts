/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import {registerStateMutator, State} from '../../space_opera_base.js';

import {Camera} from './camera_state.js';
import {SphericalPositionDeg, Vector3D} from './types.js';

/*
 * Register state mutators and get corresponding dispatchers.
 */

/**
 * Used to initialize camera state with model-viewer's initial state. This means
 * we can rely on it to parse things like camera orbit strings, rather than
 * doing it ourselves.
 */
const SET_INITIAL_CAMERA_STATE = 'SET_INITIAL_CAMERA_STATE';
export const dispatchInitialCameraState = registerStateMutator(
    SET_INITIAL_CAMERA_STATE, (state, initialCamera?: Camera) => {
      if (!initialCamera)
        return;
      state.initialCamera = {...initialCamera};
    });

/**
 * For any component to use when they need to reference the current preview
 * camera state.
 */
const SET_CURRENT_CAMERA_STATE = 'SET_CURRENT_CAMERA_STATE';
export const dispatchCurrentCameraState = registerStateMutator(
    SET_CURRENT_CAMERA_STATE, (state, currentCamera?: Camera) => {
      if (!currentCamera)
        return;
      state.currentCamera = {...currentCamera};
    });


const SET_CAMERA_CONTROLS_ENABLED = 'SET_CAMERA_CONTROLS_ENABLED';
export const dispatchCameraControlsEnabled = registerStateMutator(
    SET_CAMERA_CONTROLS_ENABLED, (state: State, enabled?: boolean) => {
      state.config = {...state.config, cameraControls: !!enabled};
    });

// Orbit
const SAVE_CAMERA_ORBIT = 'SAVE_CAMERA_ORBIT';
export const dispatchSaveCameraOrbit =
    registerStateMutator(SAVE_CAMERA_ORBIT, (state: State) => {
      if (!state.currentCamera)
        return;
      const currentOrbit = state.currentCamera.orbit;
      if (!currentOrbit)
        return;
      state.camera = {
        ...state.camera,
        orbit: {...currentOrbit},
        fieldOfViewDeg: state.currentCamera.fieldOfViewDeg,
      };
    });

/** Event dispatcher for changes to camera-target. */
const SET_CAMERA_TARGET = 'SET_CAMERA_TARGET';
export const dispatchCameraTarget = registerStateMutator(
    SET_CAMERA_TARGET, (state: State, target?: Vector3D) => {
      state.camera = {...state.camera, target};
    });

/** Dispatch initial orbit in camera state */
const SET_CAMERA_STATE_INITIAL_ORBIT = 'SET_CAMERA_STATE_INITIAL_ORBIT';
export const dispatchInitialOrbit = registerStateMutator(
    SET_CAMERA_STATE_INITIAL_ORBIT,
    (state: State, orbit?: SphericalPositionDeg) => {
      if (!orbit)
        return;
      state.camera = {
        ...state.camera,
        orbit,
      };
    });

/** Dispatch changes to auto rotate */
const SET_AUTO_ROTATE = 'SET_AUTO_ROTATE';
export const dispatchAutoRotate =
    registerStateMutator(SET_AUTO_ROTATE, (state, autoRotate?: boolean) => {
      state.config = {...state.config, autoRotate};
    });