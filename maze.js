let scene, camera, renderer, controls, clock

const WALL_WIDTH = 5;
const WALL_HEIGHT = 8;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 0);
    camera.rotation.set(0, 0, 0)
    //camera.lookAt(,0,0)

    renderer = new THREE.WebGLRenderer({antialias: true});
            
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.id = "canvas";
    document.body.appendChild(renderer.domElement);

    // Lock pointer on click
    renderer.domElement.addEventListener('click', () => {
        renderer.domElement.requestPointerLock();
    });

    // Add lighting to the scene
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-100, 200, 100);
    scene.add(directionalLight);

    scene.add(createPlane());
    scene.add(createWall(-10, -50, 10, -50))
    animate();
}

function createWall(fromX, fromZ, toX, toZ) {
    const wallGeometry = new THREE.BoxGeometry(Math.abs(toX - fromX), WALL_HEIGHT, WALL_WIDTH )
    const wallMaterial = new THREE.MeshStandardMaterial({color: 0xaaff33});
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.set((fromX + toX)/2, WALL_HEIGHT / 2, (fromZ + toZ) / 2);

    return wall;
}

function createPlane() {
    const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
    const planeMaterial = new THREE.MeshStandardMaterial({color: 0x565a5d, side: THREE.FrontSide});
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotateX(-Math.PI / 2);
    return plane;
}



function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}


document.addEventListener('keydown', onKeyDown);
document.addEventListener('mousemove', onMouseMove);


function onMouseMove(event) {
    if (document.pointerLockElement == renderer.domElement) {
        camera.rotateY(-event.movementX * 0.001);
        // camera.rotateX(-event.movementY * 0.001);
    }
}

function onKeyDown(event) {
    const keyCode = event.code;

    const rot = Math.PI + camera.rotation.y;
    switch(keyCode) {
        case 'KeyW':
            // forwards
            camera.position.z += Math.cos(rot);
            camera.position.x += Math.sin(rot);
            break;
        case 'KeyS':
            // backwards
            camera.position.z -= Math.cos(rot);
            camera.position.x -= Math.sin(rot);
            break;
        case 'KeyA':
            // left
            camera.position.z += Math.cos(rot + Math.PI / 2);
            camera.position.x += Math.sin(rot + Math.PI / 2);
            break;
        case 'KeyD':
            // right
            camera.position.z += Math.cos(rot - Math.PI / 2);
            camera.position.x += Math.sin(rot - Math.PI / 2);
            break;
    }
}

init();