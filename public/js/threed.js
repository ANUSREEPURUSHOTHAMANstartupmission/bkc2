import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';

let container;
let camera;
let renderer;
let scene;
let house;

function init() {
  container = document.querySelector(".scene");
  container.classList.add("loading");
  //Create scene
  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 50000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // camera.position.set(0, 2, 20);
  // camera.position.set(0, 2, 30);
  // camera.position.set(0, 10, -3000);
  camera.position.set(0, 10, 4000);

  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffcc, 10);
  light.position.set(0, 200, 8500);
  scene.add(light);

  const light1 = new THREE.DirectionalLight(0xffffff, 2);
  light1.position.set(0, 0, 10);
  scene.add(light1);

  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Model
  const loader = new GLTFLoader();
  loader.load("../../static/boeing/scene.gltf", function(gltf) {
    container.classList.remove("loading");
    scene.add(gltf.scene);
    house = gltf.scene.children[0];
    house.rotation.z += 90;
    // house.rotation.z -= 90;
    // house.rotation.x -= 50;
    // house.rotation.y += 10;


    house.position.z -= 1000;
    house.position.x -= 4000;
    // console.log(house.position);
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  house.position.z -= 50;
  house.position.x += 50;

  // x: 29000, y: 0, z: -34000
  // {x: -4000, y: 0, z: -1000}
  if (house.position.x > 29000) {
    house.position.x = -4000;
    house.position.z = -1000;
  }
  // console.log({...house.position });
  // house.position.y += 50;

  // house.rotation.z += 0.005;
  // house.rotation.y += 0.005;
  // house.rotation.x += 0.005;
  renderer.render(scene, camera);
}

// setTimeout(function() {
//   house.position.x = 39350;
//   house.position.z = -44350;
//   // x: 39350
//   // y: 0
//   // z: -44350
//   animate();
// }, 5000)

init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);