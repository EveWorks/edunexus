import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateAudio, updateMsgLoader } from "@/store/features/chat";
import useDevice from "@/hooks/use-device";
import { useMicrophone } from "@/context/MicrophoneContextProvider";

const ThreeScene = ({
  width,
  height,
  wrapperHeight,
  wrapperWidth,
  cameraPosition = { x: 0, y: -2, z: 14 },
  size = "",
}) => {
  let rendererOb = null;
  const mountRef = useRef(null);
  const { audio, msgLoading } = useAppSelector((state) => state.Chat);
  const audioUrl = useMemo(() => audio, [audio]);
  const dispatch = useAppDispatch();
  const { isMobile } = useDevice();
  const { startMicrophone } = useMicrophone();

  const cameraPosMemo = useMemo(() => cameraPosition, [cameraPosition]);

  const params = useMemo(
    () => ({
      red: 1.0,
      green: 0.7,
      blue: 0,
      threshold: 0.0,
      strength: 0.0,
      radius: 0.0,
    }),
    []
  );

  const onMouseMove = useCallback((e) => {
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    mouseX.current = (e.clientX - windowHalfX) / 100;
    mouseY.current = (e.clientY - windowHalfY) / 100;
  }, []);

  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const getWebGL = () => {
    if (rendererOb === null) {
      rendererOb = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    }
    return rendererOb;
  };

  useEffect(() => {
    const renderer = getWebGL();
    renderer.setSize(
      wrapperWidth || window.innerWidth,
      wrapperHeight || window.innerHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);

    if (renderer.domElement) {
      renderer.domElement.style.backgroundColor = !isMobile
        ? "#141414"
        : "#0C0C0C";
    }

    if (
      mountRef.current &&
      !mountRef.current.contains(renderer.domElement) &&
      renderer.domElement
    ) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(!isMobile ? "#141414" : "#0C0C0C");
    const camera = new THREE.PerspectiveCamera(
      45,
      (wrapperWidth || window.innerWidth) /
        (wrapperHeight || window.innerHeight),
      0.1,
      1000
    );

    const renderScene = new RenderPass(scene, camera);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(
        width || window.innerWidth,
        height || window.innerHeight
      )
    );
    bloomPass.threshold = params.threshold;
    bloomPass.strength = params.strength;
    bloomPass.radius = params.radius;

    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);

    const outputPass = new OutputPass();
    bloomComposer.addPass(outputPass);

    camera.position.set(cameraPosMemo.x, cameraPosMemo.y, cameraPosMemo.z);
    camera.lookAt(0, 0, 0);

    const uniforms = {
      u_time: { type: "f", value: 0.0 },
      u_frequency: { type: "f", value: 0.0 },
      u_red: { type: "f", value: 1.0 },
      u_green: { type: "f", value: 0.4 },
      u_blue: { type: "f", value: 0 },
    };

    const vertexShader = `
    uniform float u_time;

    vec3 mod289(vec3 x)
    {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 mod289(vec4 x)
    {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 permute(vec4 x)
    {
      return mod289(((x*34.0)+10.0)*x);
    }

    vec4 taylorInvSqrt(vec4 r)
    {
      return 1.79284291400159 - 0.85373472095314 * r;
    }

    vec3 fade(vec3 t) {
      return t*t*t*(t*(t*6.0-15.0)+10.0);
    }

    // Classic Perlin noise, periodic variant
    float pnoise(vec3 P, vec3 rep)
    {
      vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
      vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
      Pi0 = mod289(Pi0);
      Pi1 = mod289(Pi1);
      vec3 Pf0 = fract(P); // Fractional part for interpolation
      vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
      vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
      vec4 iy = vec4(Pi0.yy, Pi1.yy);
      vec4 iz0 = Pi0.zzzz;
      vec4 iz1 = Pi1.zzzz;

      vec4 ixy = permute(permute(ix) + iy);
      vec4 ixy0 = permute(ixy + iz0);
      vec4 ixy1 = permute(ixy + iz1);

      vec4 gx0 = ixy0 * (1.0 / 7.0);
      vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
      gx0 = fract(gx0);
      vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
      vec4 sz0 = step(gz0, vec4(0.0));
      gx0 -= sz0 * (step(0.0, gx0) - 0.5);
      gy0 -= sz0 * (step(0.0, gy0) - 0.5);

      vec4 gx1 = ixy1 * (1.0 / 7.0);
      vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
      gx1 = fract(gx1);
      vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
      vec4 sz1 = step(gz1, vec4(0.0));
      gx1 -= sz1 * (step(0.0, gx1) - 0.5);
      gy1 -= sz1 * (step(0.0, gy1) - 0.5);

      vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
      vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
      vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
      vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
      vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
      vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
      vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
      vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

      vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
      g000 *= norm0.x;
      g010 *= norm0.y;
      g100 *= norm0.z;
      g110 *= norm0.w;
      vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
      g001 *= norm1.x;
      g011 *= norm1.y;
      g101 *= norm1.z;
      g111 *= norm1.w;

      float n000 = dot(g000, Pf0);
      float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
      float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
      float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
      float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
      float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
      float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
      float n111 = dot(g111, Pf1);

      vec3 fade_xyz = fade(Pf0);
      vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
      vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
      float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
      return 2.2 * n_xyz;
    }

    uniform float u_frequency;

    void main() {
        float noise = 3.0 * pnoise(position + u_time, vec3(10.0));
        float displacement = (u_frequency / 30.) * (noise / 10.);
        vec3 newPosition = position + normal * displacement;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `; // Insert vertex shader code here
    const fragmentShader = `
      uniform float u_red;
      uniform float u_blue;
      uniform float u_green;
      void main() {
          gl_FragColor = vec4(vec3(u_red, u_green, u_blue), 1. );
      }
  `; // Insert fragment shader code here

    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vertexShader.trim(),
      fragmentShader: fragmentShader.trim(),
    });

    const geo =
      size === "sm"
        ? new THREE.IcosahedronGeometry(4, 2)
        : new THREE.IcosahedronGeometry(3, 7);

    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    mesh.material.wireframe = true;

    const listener = new THREE.AudioListener();
    camera.add(listener);

    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    if (audioUrl) {
      audioLoader.load(audioUrl, (buffer) => {
        sound.setBuffer(buffer);
        sound.setVolume(1);
        sound.play();
        const duration = buffer.duration * 1000;
        setTimeout(() => {
          dispatch(updateAudio(null));
          dispatch(updateMsgLoader(false));
          startMicrophone();
        }, duration);
      });
    }

    const analyser = new THREE.AudioAnalyser(sound, 32);

    const clock = new THREE.Clock();
    function animateOrb() {
      uniforms.u_time.value = clock.getElapsedTime();
      uniforms.u_frequency.value = analyser.getAverageFrequency();
      if (msgLoading) {
        mesh.rotation.y += 0.005;
      } else {
        camera.position.x += (mouseX.current - camera.position.x) * 0.05;
        camera.position.y += (-mouseY.current - camera.position.y) * 0.5;
        camera.lookAt(scene.position);
      }

      if (bloomComposer) {
        bloomComposer.render();
      }
      requestAnimationFrame(animateOrb);
    }
    animateOrb();

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      if (bloomComposer) bloomComposer.dispose();
      if (renderScene) renderScene.dispose();
      if (bloomPass) bloomPass.dispose();
      if (rendererOb) {
        rendererOb.dispose();
        rendererOb.forceContextLoss();
      }
      if (mountRef.current) {
        while (mountRef.current.firstChild) {
          mountRef.current.removeChild(mountRef.current.firstChild);
        }
      }
      if (sound) {
        sound.pause();
        sound.stop();
        sound.setBuffer(null);
      }
      dispatch(updateAudio(null));
      // dispatch(updateMsgLoader(false));
      // startMicrophone();
    };
  }, [width, height, cameraPosMemo, params, wrapperHeight, wrapperWidth]);

  return <div ref={mountRef} />;
};

export default React.memo(ThreeScene);
