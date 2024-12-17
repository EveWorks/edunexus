import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { Pass } from "three/examples/jsm/postprocessing/Pass.js";
import TickManager from "./tick-manager.js";

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let composer: EffectComposer;
let controls: OrbitControls | undefined;
let stats: Stats;
let gui: GUI;
let renderWidth: number;
let renderHeight: number;
let renderAspectRatio: number;

const renderTickManager = new TickManager();

interface TickEvent extends Event {
  data: any;
}

export const initEngine = async (wrapper: any): Promise<void> => {
  console.log("initEngine", wrapper);
  scene = new THREE.Scene();

  renderWidth = 250;
  renderHeight = 250;
  renderAspectRatio = renderWidth / renderHeight;

  // Camera setup
  camera = new THREE.PerspectiveCamera(75, renderAspectRatio, 0.1, 100);
  camera.position.z = 4;

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(renderWidth, renderHeight);
  renderer.setPixelRatio(window.devicePixelRatio * 1.5);
  renderer.setClearColor(0x00022a);

  // Enable shadow mapping
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  wrapper.appendChild(renderer.domElement);

  // EffectComposer and RenderPass
  const target = new THREE.WebGLRenderTarget(renderWidth, renderHeight, {
    samples: 8,
  });
  composer = new EffectComposer(renderer, target);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  // Stats and GUI
  stats = new Stats();
  wrapper.appendChild(stats.dom);

  gui = new GUI();

  // Optional OrbitControls setup
  // controls = new OrbitControls(camera, renderer.domElement);
  // controls.enableDamping = false;

  wrapper.addEventListener(
    "resize",
    () => {
      renderWidth = 250;
      renderHeight = 250;
      renderAspectRatio = renderWidth / renderHeight;

      renderer.setPixelRatio(window.devicePixelRatio * 1.5);

      camera.aspect = renderAspectRatio;
      camera.updateProjectionMatrix();

      renderer.setSize(renderWidth, renderHeight);
      composer.setSize(renderWidth, renderHeight);
    },
    false
  );

  renderTickManager.startLoop();
};

// Hooks/Accessors
export const useRenderer = (): THREE.WebGLRenderer => renderer;

export const useRenderSize = (): { width: number; height: number } => ({
  width: renderWidth,
  height: renderHeight,
});

export const useScene = (): THREE.Scene => scene;

export const useCamera = (): THREE.PerspectiveCamera => camera;

export const useControls = (): OrbitControls | undefined => controls;

export const useStats = (): Stats => stats;

export const useComposer = (): EffectComposer => composer;

export const useGui = (): GUI => gui;

export const addPass = (pass: Pass): void => {
  composer.addPass(pass);
};

export const useTick = (fn: (data: any) => void): void => {
  if (renderTickManager) {
    const _tick = (e: TickEvent) => {
      fn(e.data);
    };
    renderTickManager.addEventListener("tick", _tick as EventListener);
  }
};
