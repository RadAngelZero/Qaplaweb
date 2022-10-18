import { Suspense, useState } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { useLoaderData } from 'react-router-dom';

import AvatarAnimated from './AvatarAnimated';
import { getAnimationData } from '../services/database';
import { CircularProgress } from '@mui/material';

export async function loader({ params }) {
    const avatarUrl = `https://api.readyplayer.me/v1/avatars/${params.avatarId}.glb`;
    const animationData = await getAnimationData(params.animationId);

    return {
        avatarUrl,
        animationData: animationData.val()
    };
}

const ChooseAvatarAnimation = () => {
    const {
        avatarUrl,
        animationData
    } = useLoaderData();
    const [showAnimation, setShowAnimation] = useState(false);

    document.body.style = 'background: #00020E'

    return (
        <div style={{
                backgroundColor: 'transparent',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            {!showAnimation &&
                <CircularProgress sx={{
                    color: '#00FFDD',
                    position: 'absolute'
                }} />
            }
            <div style={{ opacity: showAnimation ? 1 : 0 }}>
                <Canvas camera={{ position: [10, 10, 10] }}
                    style={{
                        backgroundColor: 'transparent',
                        width: '100vw',
                        height: '100vh',
                    }}>
                    <ambientLight intensity={1} />
                    <directionalLight intensity={0.4} />
                    <primitive object={new THREE.GridHelper(100, 100, '#140034', '#140034')} />
                    <Suspense fallback={null}>
                        <AvatarAnimated avatarUrl={avatarUrl}
                            animationData={animationData}
                            showAnimation={showAnimation}
                            setShowAnimation={setShowAnimation} />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
}

export default ChooseAvatarAnimation;