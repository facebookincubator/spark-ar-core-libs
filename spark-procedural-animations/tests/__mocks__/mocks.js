/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {jest} from '@jest/globals';

let mockOverrides = {};

// adding custom jest mock instead of dynamic mock on specific path
// path should start from module and then using dot syntax to form a path
// Examples: Diagnostics.log, Scene.root.findFirst.
export function addMockOverride(path) {
  mockOverrides[path] = jest.fn();
  return mockOverrides[path];
}

// reset all the custom mocks overrides
export function resetMockOverrides() {
  mockOverrides = {};
}

// universal dynamic mock object that pretends to be any object or function
function DynamicMock(path, isPromise) {
  return new Proxy(
    () => {
      // Intentionally empty
    },
    {
      get: function (target, prop) {
        if (!Reflect.has(target, prop)) {
          // hide default from paths (every module has default right after its name)
          const newPath = prop === 'default' ? path : path + '.' + prop;
          if (typeof mockOverrides[newPath] === 'undefined') {
            target[prop] = DynamicMock(newPath, prop === 'then');
          } else {
            target[prop] = mockOverrides[newPath];
          }
        }
        return target[prop];
      },

      apply: function (target, thisArg, args) {
        if (isPromise === true) {
          // resolve promise immidiately
          args[0]();
        }
        return DynamicMock(path);
      },
    },
  );
}

var mockDiagnostics = DynamicMock('Diagnostics');
jest.mock('Diagnostics', () => mockDiagnostics, {virtual: true});
var mockTime = DynamicMock('Time');
jest.mock('Time', () => mockTime, {virtual: true});
var mockReactive = DynamicMock('Reactive');
jest.mock('Reactive', () => mockReactive, {virtual: true});
var mockMaterials = DynamicMock('Materials');
jest.mock('Materials', () => mockMaterials, {virtual: true});
var mockScene = DynamicMock('Scene');
jest.mock('Scene', () => mockScene, {virtual: true});
var mockAnalytics = DynamicMock('Analytics');
jest.mock('Analytics', () => mockAnalytics, {virtual: true});
var mockShadersModule = DynamicMock('Shaders');
jest.mock('Shaders', () => mockShadersModule, {virtual: true});
var mockVideosModule = DynamicMock('Videos');
jest.mock('Videos', () => mockVideosModule, {virtual: true});
var mockFaceGesturesModule = DynamicMock('FaceGestures');
jest.mock('FaceGestures', () => mockFaceGesturesModule, {virtual: true});
var mockPlatformEventsModule = DynamicMock('PlatformEvents');
jest.mock('PlatformEvents', () => mockPlatformEventsModule, {virtual: true});
var mockAvatarModule = DynamicMock('Avatar');
jest.mock('Avatar', () => mockAvatarModule, {virtual: true});
var mockFacialActionsModule = DynamicMock('FacialActions');
jest.mock('FacialActions', () => mockFacialActionsModule, {virtual: true});
var mockPlatformFunctionsModule = DynamicMock('PlatformFunctions');
jest.mock('PlatformFunctions', () => mockPlatformFunctionsModule, {
  virtual: true,
});
var mockPrefabsModule = DynamicMock('Prefabs');
jest.mock('Prefabs', () => mockPrefabsModule, {virtual: true});
var mockNetworkingModule = DynamicMock('Networking');
jest.mock('Networking', () => mockNetworkingModule, {virtual: true});
var mockLocaleModule = DynamicMock('Locale');
jest.mock('Locale', () => mockLocaleModule, {virtual: true});
var mockCallLayoutModule = DynamicMock('CallLayout');
jest.mock('CallLayout', () => mockCallLayoutModule, {virtual: true});
var mockIrisTrackingModule = DynamicMock('IrisTracking');
jest.mock('IrisTracking', () => mockIrisTrackingModule, {virtual: true});
var mockHapticFeedbackModule = DynamicMock('HapticFeedback');
jest.mock('HapticFeedback', () => mockHapticFeedbackModule, {virtual: true});
var mockBlocksModule = DynamicMock('Blocks');
jest.mock('Blocks', () => mockBlocksModule, {virtual: true});
var mockHandTrackingModule = DynamicMock('HandTracking');
jest.mock('HandTracking', () => mockHandTrackingModule, {virtual: true});
var mockEffectLinkingModule = DynamicMock('EffectLinking');
jest.mock('EffectLinking', () => mockEffectLinkingModule, {virtual: true});
var mockAnalyticsModule = DynamicMock('AnalyticsModule');
jest.mock('Analytics', () => mockAnalyticsModule, {virtual: true});
var mockParticipantsModule = DynamicMock('Participants');
jest.mock('Participants', () => mockParticipantsModule, {virtual: true});
var mockLocalDiscoveryModule = DynamicMock('LocalDiscovery');
jest.mock('LocalDiscovery', () => mockLocalDiscoveryModule, {virtual: true});
var mockControllersModule = DynamicMock('Controllers');
jest.mock('Controllers', () => mockControllersModule, {virtual: true});
var mockMultipeerModule = DynamicMock('Multipeer');
jest.mock('Multipeer', () => mockMultipeerModule, {virtual: true});
var mockLiveStreamingModule = DynamicMock('LiveStreaming');
jest.mock('LiveStreaming', () => mockLiveStreamingModule, {virtual: true});
var mockAssetsModule = DynamicMock('Assets');
jest.mock('Assets', () => mockAssetsModule, {virtual: true});
var mockDeepLinkModule = DynamicMock('DeepLink');
jest.mock('DeepLink', () => mockDeepLinkModule, {virtual: true});
var mockTouchGesturesModule = DynamicMock('TouchGestures');
jest.mock('TouchGestures', () => mockTouchGesturesModule, {virtual: true});
var mockFaceTracking2DModule = DynamicMock('FaceTracking2D');
jest.mock('FaceTracking2D', () => mockFaceTracking2DModule, {virtual: true});
var mockTexturesModule = DynamicMock('Textures');
jest.mock('Textures', () => mockTexturesModule, {virtual: true});
var mockSpatialAudioModule = DynamicMock('SpatialAudio');
jest.mock('SpatialAudio', () => mockSpatialAudioModule, {virtual: true});
var mockAnimationModule = DynamicMock('Animation');
jest.mock('Animation', () => mockAnimationModule, {virtual: true});
var mockWorldTrackingModule = DynamicMock('WorldTracking');
jest.mock('WorldTracking', () => mockWorldTrackingModule, {virtual: true});
var mockPatchesModule = DynamicMock('Patches');
jest.mock('Patches', () => mockPatchesModule, {virtual: true});
var mockAugmentsModule = DynamicMock('Augments');
jest.mock('Augments', () => mockAugmentsModule, {virtual: true});
var mockInstructionModule = DynamicMock('Instructions');
jest.mock('Instruction', () => mockInstructionModule, {virtual: true});
var mockSvgsModule = DynamicMock('Svgs');
jest.mock('Svgs', () => mockSvgsModule, {virtual: true});
var mockCameraInfoModule = DynamicMock('CameraInfo');
jest.mock('CameraInfo', () => mockCameraInfoModule, {virtual: true});
var mockPhysicsModule = DynamicMock('Physics');
jest.mock('Physics', () => mockPhysicsModule, {virtual: true});
var mockNativeUIModule = DynamicMock('NativeUI');
jest.mock('NativeUI', () => mockNativeUIModule, {virtual: true});
var mockIntentModule = DynamicMock('Intent');
jest.mock('Intent', () => mockIntentModule, {virtual: true});
var mockCameraControlModule = DynamicMock('CameraControl');
jest.mock('CameraControl', () => mockCameraControlModule, {virtual: true});
var mockInstantGamingModule = DynamicMock('InstantGaming');
jest.mock('InstantGaming', () => mockInstantGamingModule, {virtual: true});
var mockFontsModule = DynamicMock('Fonts');
jest.mock('Fonts', () => mockFontsModule, {virtual: true});
var mockUnitsModule = DynamicMock('Units');
jest.mock('Units', () => mockUnitsModule, {virtual: true});
var mockPlatformTexturesModule = DynamicMock('PlatformTextures');
jest.mock('PlatformTextures', () => mockPlatformTexturesModule, {
  virtual: true,
});
var mockLocationModule = DynamicMock('Location');
jest.mock('Location', () => mockLocationModule, {virtual: true});
var mockSparkVisionModule = DynamicMock('SparkVision');
jest.mock('SparkVision', () => mockSparkVisionModule, {virtual: true});
var mockFormFactorModule = DynamicMock('FormFactor');
jest.mock('FormFactor', () => mockFormFactorModule, {virtual: true});
var mockGraphQLModule = DynamicMock('GraphQL');
jest.mock('GraphQL', () => mockGraphQLModule, {virtual: true});
var mockAudioModule = DynamicMock('Audio');
jest.mock('Audio', () => mockAudioModule, {virtual: true});
var mockPersistenceModule = DynamicMock('Persistence');
jest.mock('Persistence', () => mockPersistenceModule, {virtual: true});
var mockSpatialGestureModule = DynamicMock('SpatialGesture');
jest.mock('SpatialGesture', () => mockSpatialGestureModule, {virtual: true});
var mockAudioGraphModule = DynamicMock('AudioGraph');
jest.mock('AudioGraph', () => mockAudioGraphModule, {virtual: true});
var mockRemote3DModelsModule = DynamicMock('Remote3DModels');
jest.mock('Remote3DModels', () => mockRemote3DModelsModule, {virtual: true});
var mockIdentityModule = DynamicMock('Identity');
jest.mock('Identity', () => mockIdentityModule, {virtual: true});
var mockSpatialHandTrackingModule = DynamicMock('SpatialHandTracking');
jest.mock('SpatialHandTracking', () => mockSpatialHandTrackingModule, {
  virtual: true,
});
var mockPageScopedIdentityModule = DynamicMock('PageScopedIdentity');
jest.mock('PageScopedIdentity', () => mockPageScopedIdentityModule, {
  virtual: true,
});
var mockVoiceControlModule = DynamicMock('VoiceControl');
jest.mock('VoiceControl', () => mockVoiceControlModule, {virtual: true});
var mockLayersModule = DynamicMock('Layers');
jest.mock('Layers', () => mockLayersModule, {virtual: true});
var mockBodyTrackingModule = DynamicMock('BodyTracking');
jest.mock('BodyTracking', () => mockBodyTrackingModule, {virtual: true});
var mockLightingEstimationModule = DynamicMock('LightingEstimation');
jest.mock('LightingEstimation', () => mockLightingEstimationModule, {
  virtual: true,
});
var mockWorldUnderstandingModule = DynamicMock('WorldUnderstanding');
jest.mock('WorldUnderstanding', () => mockWorldUnderstandingModule, {
  virtual: true,
});
var mockNativeNavigationModule = DynamicMock('NativeNavigation');
jest.mock('NativeNavigation', () => mockNativeNavigationModule, {
  virtual: true,
});
var mockSegmentationModule = DynamicMock('Segmentation');
jest.mock('Segmentation', () => mockSegmentationModule, {virtual: true});
var mockUIModule = DynamicMock('UI');
jest.mock('UI', () => mockUIModule, {virtual: true});
var mockPortalWorldModelModule = DynamicMock('PortalWorldModel');
jest.mock('PortalWorldModel', () => mockPortalWorldModelModule, {
  virtual: true,
});
var mockMultiplayerModule = DynamicMock('Multiplayer');
jest.mock('Multiplayer', () => mockMultiplayerModule, {virtual: true});
var mockFaceTrackingModule = DynamicMock('FaceTracking');
jest.mock('FaceTracking', () => mockFaceTrackingModule, {virtual: true});
var mockLipsyncModule = DynamicMock('Lipsync');
jest.mock('Lipsync', () => mockLipsyncModule, {virtual: true});
var mockDeviceMotionModule = DynamicMock('DeviceMotion');
jest.mock('DeviceMotion', () => mockDeviceMotionModule, {virtual: true});
var mockRandomModule = DynamicMock('Random');
jest.mock('Random', () => mockRandomModule, {virtual: true});
var mockExternalTexturesModule = DynamicMock('ExternalTextures');
jest.mock('ExternalTextures', () => mockExternalTexturesModule, {
  virtual: true,
});
