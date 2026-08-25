const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2.0; 

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(2, 4, 3);
scene.add(directionalLight);

const geometry = new THREE.BoxGeometry();

const material = new THREE.MeshStandardMaterial({ color: 0xffff00 }); 

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const outlineGeometry = new THREE.BoxGeometry(1.1, 1.1, 1.1);

const outlineMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xffffff, 
    side: THREE.BackSide 
});

const outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
cube.add(outline);

const fpsMeter = document.getElementById('fps-meter');
let frameCount = 0;
let previousTime = performance.now();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate(currentTime) {
    requestAnimationFrame(animate);

    frameCount++;
    const elapsed = currentTime - previousTime;

    if (elapsed >= 1000) {
        fpsMeter.textContent = `FPS: ${Math.round(frameCount / (elapsed / 1000))}`;
        frameCount = 0;
        previousTime = currentTime;
    }

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();

