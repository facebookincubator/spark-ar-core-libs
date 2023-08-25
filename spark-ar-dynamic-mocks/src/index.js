/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {jest} from '@jest/globals';

let mockOverrides = {};

// adding custom jest mock instead of dynamic mock on specific path
// path should start from module and then using dot syntax to form a path
// Examples: Diagnostics.log, Scene.root.findFirst.
export function addMockOverride(path, customMock) {
  mockOverrides[path] = customMock == null ? jest.fn() : customMock;
  return mockOverrides[path];
}

// reset all the custom mocks overrides
export function resetMockOverrides() {
  mockOverrides = {};
}

// universal dynamic mock object that pretends to be any object or function
function DynamicMock(path, isPromise, isPromiseResult) {
  return new Proxy(
    () => {
      // Intentionally empty
    },
    {
      set: function (target, prop, val) {
        const newPath = path + '.' + prop;
        if (typeof mockOverrides[newPath] !== 'undefined') {
          mockOverrides[newPath](val);
        }
        return true;
      },

      get: function (target, prop) {
        if (isPromiseResult === true && prop === 'then') {
          // make objects returned from a promise resolution not promises on their own to avoid endless recursion
          return undefined;
        }

        // hide default from paths (every module has default right after its name)
        const newPath = prop === 'default' ? path : path + '.' + prop;
        if (typeof mockOverrides[newPath] === 'undefined') {
          return DynamicMock(newPath, prop === 'then');
        } else {
          return mockOverrides[newPath];
        }
      },

      apply: function (target, thisArg, args) {
        if (isPromise === true) {
          // resolve promise immidiately
          args[0](
            typeof mockOverrides[path] === 'undefined'
              ? DynamicMock(path, false, true)
              : mockOverrides[path],
          );
        }
        return DynamicMock(path);
      },
    },
  );
}

/**
 * keep this alphabetized plx
 */
var mockAnalytics = DynamicMock('Analytics');
var mockAnalyticsModule = DynamicMock('AnalyticsModule');
var mockAnimationModule = DynamicMock('Animation');
var mockAssetsModule = DynamicMock('Assets');
var mockAudioGraphModule = DynamicMock('AudioGraph');
var mockAudioModule = DynamicMock('Audio');
var mockAugmentsModule = DynamicMock('Augments');
var mockAvatarModule = DynamicMock('Avatar');
var mockBlocksModule = DynamicMock('Blocks');
var mockBodyTrackingModule = DynamicMock('BodyTracking');
var mockCallLayoutModule = DynamicMock('CallLayout');
var mockCameraControlModule = DynamicMock('CameraControl');
var mockCameraInfoModule = DynamicMock('CameraInfo');
var mockControllersModule = DynamicMock('Controllers');
var mockDeepLinkModule = DynamicMock('DeepLink');
var mockDeviceMotionModule = DynamicMock('DeviceMotion');
var mockDiagnostics = DynamicMock('Diagnostics');
var mockEffectLinkingModule = DynamicMock('EffectLinking');
var mockExternalTexturesModule = DynamicMock('ExternalTextures');
var mockFaceGesturesModule = DynamicMock('FaceGestures');
var mockFaceTracking2DModule = DynamicMock('FaceTracking2D');
var mockFaceTrackingModule = DynamicMock('FaceTracking');
var mockFacialActionsModule = DynamicMock('FacialActions');
var mockFontsModule = DynamicMock('Fonts');
var mockFormFactorModule = DynamicMock('FormFactor');
var mockGraphQLModule = DynamicMock('GraphQL');
var mockHandTrackingModule = DynamicMock('HandTracking');
var mockHapticFeedbackModule = DynamicMock('HapticFeedback');
var mockIdentityModule = DynamicMock('Identity');
var mockInstantGamingModule = DynamicMock('InstantGaming');
var mockInstructionModule = DynamicMock('Instructions');
var mockIntentModule = DynamicMock('Intent');
var mockIrisTrackingModule = DynamicMock('IrisTracking');
var mockLayersModule = DynamicMock('Layers');
var mockLightingEstimationModule = DynamicMock('LightingEstimation');
var mockLipsyncModule = DynamicMock('Lipsync');
var mockLiveStreamingModule = DynamicMock('LiveStreaming');
var mockLocalDiscoveryModule = DynamicMock('LocalDiscovery');
var mockLocaleModule = DynamicMock('Locale');
var mockLocationModule = DynamicMock('Location');
var mockMaterials = DynamicMock('Materials');
var mockMultipeerModule = DynamicMock('Multipeer');
var mockMultiplayerModule = DynamicMock('Multiplayer');
var mockNativeNavigationModule = DynamicMock('NativeNavigation');
var mockNativeUIModule = DynamicMock('NativeUI');
var mockNetworkingModule = DynamicMock('Networking');
var mockPageScopedIdentityModule = DynamicMock('PageScopedIdentity');
var mockParticipantsModule = DynamicMock('Participants');
var mockPatchesModule = DynamicMock('Patches');
var mockPersistenceModule = DynamicMock('Persistence');
var mockPhysicsModule = DynamicMock('Physics');
var mockPlatformEventsModule = DynamicMock('PlatformEvents');
var mockPlatformFunctionsModule = DynamicMock('PlatformFunctions');
var mockPlatformTexturesModule = DynamicMock('PlatformTextures');
var mockPortalWorldModelModule = DynamicMock('PortalWorldModel');
var mockPrefabsModule = DynamicMock('Prefabs');
var mockRandomModule = DynamicMock('Random');
var mockReactive = DynamicMock('Reactive');
var mockRecognitionTrackingModule = DynamicMock('RecognitionTracking');
var mockRemote3DModelsModule = DynamicMock('Remote3DModels');
var mockScene = DynamicMock('Scene');
var mockSegmentationModule = DynamicMock('Segmentation');
var mockShadersModule = DynamicMock('Shaders');
var mockSparkVisionModule = DynamicMock('SparkVision');
var mockSpatialAudioModule = DynamicMock('SpatialAudio');
var mockSpatialGestureModule = DynamicMock('SpatialGesture');
var mockSpatialHandTrackingModule = DynamicMock('SpatialHandTracking');
var mockSvgsModule = DynamicMock('Svgs');
var mockTexturesModule = DynamicMock('Textures');
var mockTime = DynamicMock('Time');
var mockTouchGesturesModule = DynamicMock('TouchGestures');
var mockUIModule = DynamicMock('UI');
var mockUnitsModule = DynamicMock('Units');
var mockVideosModule = DynamicMock('Videos');
var mockVoiceControlModule = DynamicMock('VoiceControl');
var mockWeatherModule = DynamicMock('Weather');
var mockWorldTrackingModule = DynamicMock('WorldTracking');
var mockWorldUnderstandingModule = DynamicMock('WorldUnderstanding');

jest.mock('Analytics', () => mockAnalytics, {virtual: true});
jest.mock('AnalyticsModule', () => mockAnalyticsModule, {virtual: true});
jest.mock('Animation', () => mockAnimationModule, {virtual: true});
jest.mock('Assets', () => mockAssetsModule, {virtual: true});
jest.mock('Audio', () => mockAudioModule, {virtual: true});
jest.mock('AudioGraph', () => mockAudioGraphModule, {virtual: true});
jest.mock('Augments', () => mockAugmentsModule, {virtual: true});
jest.mock('Avatar', () => mockAvatarModule, {virtual: true});
jest.mock('Blocks', () => mockBlocksModule, {virtual: true});
jest.mock('BodyTracking', () => mockBodyTrackingModule, {virtual: true});
jest.mock('CallLayout', () => mockCallLayoutModule, {virtual: true});
jest.mock('CameraControl', () => mockCameraControlModule, {virtual: true});
jest.mock('CameraInfo', () => mockCameraInfoModule, {virtual: true});
jest.mock('Controllers', () => mockControllersModule, {virtual: true});
jest.mock('DeepLink', () => mockDeepLinkModule, {virtual: true});
jest.mock('DeviceMotion', () => mockDeviceMotionModule, {virtual: true});
jest.mock('Diagnostics', () => mockDiagnostics, {virtual: true});
jest.mock('EffectLinking', () => mockEffectLinkingModule, {virtual: true});
jest.mock('ExternalTextures', () => mockExternalTexturesModule, {virtual: true});
jest.mock('FaceGestures', () => mockFaceGesturesModule, {virtual: true});
jest.mock('FaceTracking', () => mockFaceTrackingModule, {virtual: true});
jest.mock('FaceTracking2D', () => mockFaceTracking2DModule, {virtual: true});
jest.mock('FacialActions', () => mockFacialActionsModule, {virtual: true});
jest.mock('Fonts', () => mockFontsModule, {virtual: true});
jest.mock('FormFactor', () => mockFormFactorModule, {virtual: true});
jest.mock('GraphQL', () => mockGraphQLModule, {virtual: true});
jest.mock('HandTracking', () => mockHandTrackingModule, {virtual: true});
jest.mock('HapticFeedback', () => mockHapticFeedbackModule, {virtual: true});
jest.mock('Identity', () => mockIdentityModule, {virtual: true});
jest.mock('InstantGaming', () => mockInstantGamingModule, {virtual: true});
jest.mock('Instruction', () => mockInstructionModule, {virtual: true});
jest.mock('Intent', () => mockIntentModule, {virtual: true});
jest.mock('IrisTracking', () => mockIrisTrackingModule, {virtual: true});
jest.mock('Layers', () => mockLayersModule, {virtual: true});
jest.mock('LightingEstimation', () => mockLightingEstimationModule, {virtual: true});
jest.mock('Lipsync', () => mockLipsyncModule, {virtual: true});
jest.mock('LiveStreaming', () => mockLiveStreamingModule, {virtual: true});
jest.mock('LocalDiscovery', () => mockLocalDiscoveryModule, {virtual: true});
jest.mock('Locale', () => mockLocaleModule, {virtual: true});
jest.mock('Location', () => mockLocationModule, {virtual: true});
jest.mock('Materials', () => mockMaterials, {virtual: true});
jest.mock('Multipeer', () => mockMultipeerModule, {virtual: true});
jest.mock('Multiplayer', () => mockMultiplayerModule, {virtual: true});
jest.mock('NativeNavigation', () => mockNativeNavigationModule, {virtual: true});
jest.mock('NativeUI', () => mockNativeUIModule, {virtual: true});
jest.mock('Networking', () => mockNetworkingModule, {virtual: true});
jest.mock('PageScopedIdentity', () => mockPageScopedIdentityModule, {virtual: true});
jest.mock('Participants', () => mockParticipantsModule, {virtual: true});
jest.mock('Patches', () => mockPatchesModule, {virtual: true});
jest.mock('Persistence', () => mockPersistenceModule, {virtual: true});
jest.mock('Physics', () => mockPhysicsModule, {virtual: true});
jest.mock('PlatformEvents', () => mockPlatformEventsModule, {virtual: true});
jest.mock('PlatformFunctions', () => mockPlatformFunctionsModule, {virtual: true});
jest.mock('PlatformTextures', () => mockPlatformTexturesModule, {virtual: true});
jest.mock('PortalWorldModel', () => mockPortalWorldModelModule, {virtual: true});
jest.mock('Prefabs', () => mockPrefabsModule, {virtual: true});
jest.mock('Random', () => mockRandomModule, {virtual: true});
jest.mock('Reactive', () => mockReactive, {virtual: true});
jest.mock('RecognitionTracking', () => mockRecognitionTrackingModule, {virtual: true});
jest.mock('Remote3DModels', () => mockRemote3DModelsModule, {virtual: true});
jest.mock('Scene', () => mockScene, {virtual: true});
jest.mock('Segmentation', () => mockSegmentationModule, {virtual: true});
jest.mock('Shaders', () => mockShadersModule, {virtual: true});
jest.mock('SparkVision', () => mockSparkVisionModule, {virtual: true});
jest.mock('SpatialAudio', () => mockSpatialAudioModule, {virtual: true});
jest.mock('SpatialGesture', () => mockSpatialGestureModule, {virtual: true});
jest.mock('SpatialHandTracking', () => mockSpatialHandTrackingModule, {virtual: true});
jest.mock('Svgs', () => mockSvgsModule, {virtual: true});
jest.mock('Textures', () => mockTexturesModule, {virtual: true});
jest.mock('Time', () => mockTime, {virtual: true});
jest.mock('TouchGestures', () => mockTouchGesturesModule, {virtual: true});
jest.mock('UI', () => mockUIModule, {virtual: true});
jest.mock('Units', () => mockUnitsModule, {virtual: true});
jest.mock('Videos', () => mockVideosModule, {virtual: true});
jest.mock('VoiceControl', () => mockVoiceControlModule, {virtual: true});
jest.mock('Weather', () => mockWeatherModule, {virtual: true});
jest.mock('WorldTracking', () => mockWorldTrackingModule, {virtual: true});
jest.mock('WorldUnderstanding', () => mockWorldUnderstandingModule, {virtual: true});
