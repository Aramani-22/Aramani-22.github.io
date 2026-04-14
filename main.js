import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/controls/OrbitControls.js";

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("black");

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ✅ Controls (AFTER camera + renderer)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: "purple" });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Light
const light = new THREE.PointLight(0xffffff, 1.5);
light.position.set(5, 5, 5);
scene.add(light);

// 🌟 ===== YOUR NAME (CORRECT WAY) =====
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

// Fix resolution
canvas.width = 1024;
canvas.height = 256;

context.fillStyle = "white";
context.font = "bold 60px Arial";
context.fillText("Aditi Ramani", 50, 100);
context.font = "30px Arial";
context.fillText("Software Developer", 50, 160);

const texture = new THREE.CanvasTexture(canvas);
const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
const sprite = new THREE.Sprite(spriteMaterial);

// Position your name above cube
sprite.position.set(0, 2.5, 0);
sprite.scale.set(4, 1, 1); // control size

scene.add(sprite);

// 🎥 Animation Loop
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update(); // IMPORTANT

  renderer.render(scene, camera);
}
animate();

// 📱 Responsive Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});