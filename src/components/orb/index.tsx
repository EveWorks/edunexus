import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { SavePass } from "three/examples/jsm/postprocessing/SavePass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { BlendShader } from "three/examples/jsm/shaders/BlendShader.js";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader.js";
import gsap from "gsap";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { initEngine } from "./render/init";
// import TRACK from './fire.mp3';

// Visualizer Class
class Visualizer {
  mesh: THREE.Mesh;
  fragmentUniformName: string;
  listener: THREE.AudioListener;
  sound: THREE.Audio;
  loader: THREE.AudioLoader;
  analyzer: THREE.AudioAnalyser;

  constructor(mesh: THREE.Mesh, fragmentUniformName: string) {
    this.mesh = mesh;
    this.fragmentUniformName = fragmentUniformName;
    (this.mesh.material as THREE.ShaderMaterial).uniforms[
      this.fragmentUniformName
    ] = { value: 0 };
    this.listener = new THREE.AudioListener();
    this.mesh.add(this.listener);

    this.sound = new THREE.Audio(this.listener);
    this.loader = new THREE.AudioLoader();

    this.analyzer = new THREE.AudioAnalyser(this.sound, 32);
  }

  load(path: string) {
    this.loader.load(path, (buffer) => {
      this.sound.setBuffer(buffer);
      this.sound.setLoop(true);
      this.sound.setVolume(0.5);
      this.sound.play();
    });
  }

  getFrequency() {
    return this.analyzer.getAverageFrequency();
  }

  update() {
    const freq = Math.max(100 - this.getFrequency(), 0) / 50;
    console.log(freq);
    const freqUniform = (this.mesh.material as THREE.ShaderMaterial).uniforms[
      this.fragmentUniformName
    ];
    gsap.to(freqUniform, {
      duration: 1.5,
      ease: "Slow.easeOut",
      value: freq,
    });
  }
}

const VisualizerComponent: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const initializeEngine = async () => {
      await initEngine(mountRef?.current);
    };

    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let composer: EffectComposer;
    let visualizer: Visualizer;
    const clock = new THREE.Clock();

    const init = () => {
      if (!mountRef.current) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      // Scene & Camera
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
      camera.position.z = 5;

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      mountRef.current.appendChild(renderer.domElement);

      // Lights
      const dirLight = new THREE.DirectionalLight("#ffffff", 1);
      const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
      scene.add(dirLight, ambientLight);

      // Geometry & Material
      const geometry = new THREE.SphereGeometry(1, 100, 100);
      const material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uAudioFrequency: { value: 0 },
        },
      });

      const ico = new THREE.Mesh(geometry, material);
      const wireframe = new THREE.LineSegments(geometry, material);
      wireframe.scale.setScalar(1.015);
      ico.add(wireframe);

      visualizer = new Visualizer(ico, "uAudioFrequency");
      // visualizer.load(TRACK);

      scene.add(ico);

      // Postprocessing
      const renderTargetParameters = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        stencilBuffer: false,
      };

      const savePass = new SavePass(
        new THREE.WebGLRenderTarget(width, height, renderTargetParameters)
      );
      const blendPass = new ShaderPass(BlendShader, "tDiffuse1");
      blendPass.uniforms["tDiffuse2"].value = savePass.renderTarget.texture;
      blendPass.uniforms["mixRatio"].value = 0.725;

      const outputPass = new ShaderPass(CopyShader);
      outputPass.renderToScreen = true;

      composer = new EffectComposer(renderer);
      composer.addPass(blendPass);
      composer.addPass(savePass);
      composer.addPass(outputPass);

      // Animation Loop
      const animate = () => {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        material.uniforms.uTime.value += delta;

        visualizer.update();

        composer.render();
      };

      animate();
    };

    initializeEngine().then(() => {
      init();
    });

    // Clean up on unmount
    return () => {
      if (renderer && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: "250px", height: "250px" }} />;
};

export default VisualizerComponent;
