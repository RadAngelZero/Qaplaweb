import { useState, useEffect, useMemo } from 'react';
import { Button, Box, styled, Typography} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { getTwitchUserData, signInWithTwitch } from '../services/twitch';
import { getUserToken } from '../services/functions';
import { signTwitchUser } from '../services/auth';
import { createUserProfile, updateUserProfile } from '../services/database';
import logoQapla from "../assets/QaplaExtruded.png"
import {ReactComponent as IconTwich} from '../assets/twitch-glitch-dark.svg'
import gifs from "../assets/giphy.gif"


function useQuery() {
    const { search } = window.location;

    return useMemo(() => new URLSearchParams(search), [search]);
}

const SigninContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height:'100vh',
});

const BottonContainer = styled(Box)((({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        width: '100%'
    },
    [theme.breakpoints.up('md')]: {
        width: 600,
    },
    background:'linear-gradient(135.92deg, #A716EE 2.95%, #2C07FA 100%)',
    boxShadow: '0px 4px 5px #263238',
    minWidth: '834px',
    maxWidth:'834px',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'start',
    padding:'24px',
    borderRadius:'40px 40px 0px 0px',
    position: 'absolute',
    bottom: '0px',
    zIndex:'1'
})));

const ContentItem = styled(Box)({
    maxWidth:'356px',
    minWidth: '356px',
    maxHeight: '350px',
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginLeft: '15px',
    marginBottom: '40px'
});

const Text = styled(Typography)({
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '40px',
    lineHeight: '48px',
    color: '#FFFFFF',
    marginBottom: '70px',
    marginTop: '50px'
});

const ButtonTwitch = styled(Button)({
    background:'#000000',
    color: '#FFFFFF',
    maxWidth:'260px',
    height:'74px',
    borderRadius: '100px',
    fontWeight:'600',
    lineHeight: '19.09',
    '&:hover':{
        backgroundColor: '#000000',
        opacity: '0.8'
    }

});

const Gifs = styled('img')({
    minWidth: '880px',
    maxWidth:'834px',
});

const SignIn = ({ user }) => {
    const [isLoadingAuth, setIsLoadingAuth] = useState(false);
    const query = useQuery();
    const { t } = useTranslation();

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
                }
            }
        }

        checkIfUsersIsSigningIn();
    }, [user, isLoadingAuth, query]);

    const signIn = () => {
        if (!isLoadingAuth) {
            setIsLoadingAuth(true);
            signInWithTwitch();
            setIsLoadingAuth(false);
        }
    }

    return (
        <SigninContainer itemType='div'>
            <Gifs src={gifs} alt='Gifs'/>
            <BottonContainer itemType='div'>
                <ContentItem itemType='div'>
                    <img src={logoQapla } alt="icon"/>
                    <Text>
                        {t('SignIn.title')}
                    </Text>
                    <ButtonTwitch onClick={signIn}>
                        <IconTwich style={{ padding:'5px'}}/>
                            {isLoadingAuth ?
                                t('SignIn.loading')
                                :
                                t('SignIn.continueWithTwitch')
                            }
                    </ButtonTwitch>
                </ContentItem>
            </BottonContainer>
        </SigninContainer>
    );
}

export default SignIn;