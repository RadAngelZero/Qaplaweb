import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react';
import { saveOverlayCamera } from '../services/database';

// Rad https://api.readyplayer.me/v1/avatars/633e16c870674b37a2c050a1.glb
// Fer https://api.readyplayer.me/v1/avatars/633728096024f0a2e7d204d3.glb
// DHVS https://models.readyplayer.me/633872197ca7d77c3a631715.glb
const AvatarAnimated = (props) => {
    const group = useRef();
    const { scene } = useGLTF(props.avatarUrl);
    const { animations } = useGLTF(props.animationData.url);
    const [avatarMixer] = useState(() => new THREE.AnimationMixer());
    const [cameraReady, setCameraReady] = useState(false);
    // const { camera } = useThree();
    const avatarRef = useRef();

    useEffect(() => {
        if (scene && !props.showAnimation) {
            props.setShowAnimation(true);
        }

        if (props.showAnimation && animations && cameraReady) {
            avatarMixer.stopAllAction();
            const animation = avatarMixer.clipAction(animations[0], group.current);

            animation.fadeIn(.5).play().setLoop();
        }
    }, [animations, avatarMixer, avatarMixer, avatarRef, cameraReady, scene, props.showAnimation]);

    useFrame((state, delta) => {
        if (props.showAnimation) {
            state.camera.aspect = props.animationData.camera.aspect;
            state.camera.rotation.set(
                props.animationData.camera.rotation.x,
                props.animationData.camera.rotation.y,
                props.animationData.camera.rotation.z
            );
            state.camera.position.lerp(
                (new THREE.Vector3(
                        props.animationData.camera.position.x,
                        props.animationData.camera.position.y,
                        props.animationData.camera.position.z
                    )
                ),
                .1
            );
            state.camera.updateProjectionMatrix();
        }
        if (!cameraReady) {
            setCameraReady(true);
        }

        avatarMixer.update(delta);
    });

    return (
        <group ref={group} {...props} dispose={null}>
            <primitive object={scene} ref={avatarRef} />
            {/* <mesh position={[-1, -1, -1]} onClick={() => {saveOverlayCamera(props.animationId, camera.position, camera.rotation); alert('Guardado Overlay')}}>
            <boxGeometry args={[1, 1, 1]} />
            </mesh> */}
        </group>
    );
}

export default AvatarAnimated;