import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import { saveAvatarId, saveAvatarUrl, saveReadyPlayerMeUserId } from '../services/database';
import { useAuth } from '../AuthProvider';

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
});

const AvatarCreator = () => {
    const iFrameRef = useRef(null);
    const user = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.addEventListener('message', subscribe);
        document.addEventListener('message', subscribe);
        return () => {
            window.removeEventListener('message', subscribe);
            document.removeEventListener('message', subscribe);
        }
    });

    const subscribe = (event) => {
        const json = parse(event);

        if (json?.source !== 'readyplayerme') {
            return;
        }

        // Subscribe to all events sent from Ready Player Me
        // once frame is ready
        if (json.eventName === 'v1.frame.ready') {
            let iFrame = iFrameRef.current;
            if( iFrame && iFrame.contentWindow) {
                iFrame.contentWindow.postMessage(
                    JSON.stringify({
                        target: 'readyplayerme',
                        type: 'subscribe',
                        eventName: 'v1.**'
                    }),
                    '*'
                );
            }
        }

        // Get avatar GLB URL
        if (json.eventName === 'v1.avatar.exported') {
            onAvatarExported(json.data);
        }
    }

    const parse = (event) => {
        try {
          return JSON.parse(event.data);
        } catch (error) {
          return null;
        }
    }

    const onAvatarExported = async (data) => {
         /**
         * data.url is always: https://models.readyplayer.me/{avatarId}.glb
         * so we extract the avatarId by doing a substring from the last '/' index + 1 and
         * then removing the '.glb'
         * As it is a route to a file the last '/' is before the {avatarId}.glb even if there are changes
         * on the base url, and also can not be nothing else after the '.glb' because it is a rout to a file
         */
          const avatarId = data.url.substring(data.url.lastIndexOf('/') + 1).replace('.glb', '');

          await saveAvatarId(user.id, avatarId);

          // Save url and user id
          await saveAvatarUrl(user.id, `https://api.readyplayer.me/v1/avatars/${avatarId}.glb`);
          if (data.userId) {
              await saveReadyPlayerMeUserId(user.id, data.userId);
          }

          // Navgate to other place
          navigate('/avatar/background', {
            state: location.state
          });
    }

    return (
        <Container>
            <iframe src='https://qapla.readyplayer.me/avatar?frameApi'
                allow='camera *; microphone *'
                height='100%'
                width='835px'
                style={{ border: 0 }}
                id='frame'
                ref={iFrameRef}
                title='Ready Player Me' />
        </Container>
    );
}

export default AvatarCreator;
