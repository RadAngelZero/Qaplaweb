import { useState, useEffect, useMemo } from 'react';
import { Button, Box, styled, Typography} from '@mui/material';

import { getTwitchUserData, signInWithTwitch } from '../services/twitch';
import { getUserToken } from '../services/functions';
import { signTwitchUser } from '../services/auth';
import { createUserProfile, updateUserProfile } from '../services/database';

import logoQapla from "../assets/QaplaExtruded.png"
import {ReactComponent as IconTwich} from '../assets/twitch-glitch-dark.svg'


function useQuery() {
    const { search } = window.location;

    return useMemo(() => new URLSearchParams(search), [search]);
}

const SigninContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height:'100vh'
})
const TopContainer = styled(Box)({
    height:'40%'
 })

const BottonContainer = styled(Box)({
    background:'linear-gradient(135.92deg, #A716EE 2.95%, #2C07FA 100%)',
    boxShadow: '0px 4px 5px #263238',
    height:'520px',
    minWidth: '834px',
    maxWidth:'834px',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'start',
    padding:'24px',
    borderRadius:'40px 40px 0px 0px'
    
})

const ContentItem = styled(Box)({
  maxWidth:'356px',
  minWidth: '356px',
  height: '450px',
  display: 'flex',
  flexDirection:'column',
  justifyContent: 'space-evenly',
  alignItems: 'start',
  marginLeft: '15px'
 

})

const Text = styled(Typography)({
fontStyle: 'normal',
fontWeight: '700',
fontSize: '40px',
lineHeight: '48px',
color: '#FFFFFF'
})

const ButtonTwitch = styled(Button)({
 background:'#000000',
 color: '#FFFFFF',
 width:'260px',
 height:'74px',
 borderRadius: '100px',
 fontWeight:'600',
 lineHeight: '19.09'
 

})






const SignIn = ({ user }) => {
    const [isLoadingAuth, setIsLoadingAuth] = useState(false);
    const query = useQuery();

    useEffect(() => {
        async function checkIfUsersIsSigningIn() {
            const twitchClientCode = query.get('code');

            if (!isLoadingAuth && !user && twitchClientCode) {
                setIsLoadingAuth(true);
                const tokenData = await getUserToken(twitchClientCode);
                if (tokenData && tokenData.data && tokenData.data.access_token) {
                    const userData = await getTwitchUserData(tokenData.data.access_token);
                    const user = await signTwitchUser(userData, tokenData.data);

                    if (user.isNewUser) {
                        // For a new user their uid and userName are the same than their twitch id and twitch display name
                        await createUserProfile(user.uid, user.email, user.displayName, user.photoURL, user.uid, user.displayName);
                    } else {
                        await updateUserProfile(user.uid, {
                            email: user.email,
                            userName: user.displayName,
                            photoUrl: user.photoURL
                        });
                    }

                    // Successful auth
                    // Get streamer to react
                    // const streamer = localStorage.getItem('streamerUid');
                }
            }
        }

        checkIfUsersIsSigningIn();
    }, [user, isLoadingAuth, query]);

    const signIn = () => {
        setIsLoadingAuth(true);
        signInWithTwitch();
        setIsLoadingAuth(false);
    }

    return (
        <SigninContainer itemType='div'>
            <TopContainer itemType='div'>
            gfg hola
            
            </TopContainer>
                    <BottonContainer itemType='div'>
                        <ContentItem itemType='div'>
                            <img src={logoQapla } alt="icon"/>
                                 <Text>Link your Twich to react on stream</Text>
                                    <ButtonTwitch>
                                        <IconTwich style={{ padding:'5px'}}/>
                                         Continue with Twich
                                    </ButtonTwitch>
                        </ContentItem> 
                    </BottonContainer>
        </SigninContainer>
    );
}

export default SignIn;