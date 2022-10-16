import { useEffect, useState } from 'react';
import { Button, Box, styled, Typography, Tooltip, Dialog, DialogContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { ReactComponent as ShareArrow } from '../assets/ShareArrow.svg';
import { ReactComponent as TwitchIcon } from '../assets/TwitchLight.svg';
import { ReactComponent as YouTubeIcon } from '../assets/YouTube.svg';
import { ReactComponent as TwitterIcon } from '../assets/Twitter.svg';
import { ReactComponent as TikTokIcon } from '../assets/TikTok.svg';
import { ReactComponent as InstagramIcon } from '../assets/Instagram.svg';
import { ReactComponent as DiscordIcon } from '../assets/Discord.svg';

import TagChip from '../components/TagChip/TagChip';
import SendReaction from '../components/SendReaction/SendReaction';
import StreamCard from '../components/StreamCard/StreamCard';
import SocialButton from '../components/SocialButton/SocialButton';
import {
    followStreamer,
    getStreamerFollowersNumber,
    getStreamerIsStreaming,
    getStreamerLinks,
    getStreamerPublicProfile,
    getStreamerStreams,
    getStreamerUidWithDeepLinkAlias,
    listenToFollowingStreamer,
    unfollowStreamer
} from '../services/database';
import { getCurrentLanguage } from '../utils/i18n';
import { useAuth } from '../AuthProvider';
import { signInWithTwitchPopUp } from '../services/twitch';
import { authWithTwitch } from '../services/auth';
import { auth } from '../services/firebase';

const linksData = {
    Twitch: {
        Icon: TwitchIcon,
        boxShadowColor: '#9146FF'
    },
    Youtube: {
        Icon: YouTubeIcon,
        boxShadowColor: '#FF0000'
    },
    Twitter: {
        Icon: TwitterIcon,
        boxShadowColor: '#1DA1F2'
    },
    TikTok: {
        Icon: TikTokIcon,
        boxShadowColor: '#EE1D52'
    },
    Instagram: {
        Icon: InstagramIcon,
        boxShadowColor: '#E700AB'
    },
    Discord: {
        Icon: DiscordIcon,
        boxShadowColor: '#5865F2'
    }
};

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
})

const ProfileCover = styled(Box)({
    display: 'flex',
    width: '100vw',
    height: '20vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
});

const MainContainer = styled(Box)({
    display: 'flex',
    alignSelf: 'center',
    marginTop: '-52.5px',
    gap: '0px 60px',
});

const StremerInfoContainer = styled(Box)({
    width: '560px',
});

const StreamerInfoTopContiner = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '8px',
})

const NameContiner = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
});

const NameText = styled(Typography)({
    color: '#fff',
    fontSize: '21px',
    fontWight: '700',
    lineHeight: '22px',
    letterSpacing: '-0.40799999237060547px',
    textAlign: 'left',
});

const FollowersContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginTop: '4px',
});

const FollowersHighlightText = styled(Typography)({
    display: 'flex',
    fontSize: '14px',
    fontWeight: '700',
    lineHeight: '22px',
    letterSpacing: '0.3499999940395355px',
    color: '#fff',
});

const FollowersText = styled(Typography)({
    display: 'flex',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '22px',
    letterSpacing: '0.3499999940395355px',
    color: '#FFFFFF99',
    marginLeft: '6px',
});

const QuickButtonsContainer = styled(Box)({
    display: 'flex',
});

const ShareButton = styled(Button)({
    marginRight: '8px',
    width: '105px',
    height: '40px',
    borderRadius: '20px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '21px',
    letterSpacing: '-0.3199999928474426px',
    textAlign: 'center',
    verticalAlign: 'center',
    textTransform: 'none',
});

const FollowButton = styled(Button)({
    width: '105px',
    height: '40px',
    backgroundColor: '#3B4BF9',
    borderRadius: '20px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '21px',
    letterSpacing: '-0.3199999928474426px',
    textAlign: 'center',
    verticalAlign: 'center',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#3B4BF9BB',
    },
});

const UnfollowButton = styled(Button)({
    width: '105px',
    height: '40px',
    backgroundColor: '#0000',
    borderRadius: '20px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '21px',
    letterSpacing: '-0.3199999928474426px',
    textAlign: 'center',
    verticalAlign: 'center',
    textTransform: 'none',
    border: '1px solid #3B4BF9',
    '&:hover': {
        backgroundColor: '#F33',
        border: '1px solid #F00',
    },
});

const ProfilePic = styled(Box)({
    width: '106px',
    height: '105px',
    borderRadius: '50%',
    backgroundSize: 'contain',
    border: '6px solid #0D1021'
});

const BioText = styled(Typography)({
    color: '#fff',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '22px',
    letterSpacing: '0.3499999940395355px',
    marginTop: '32px',
});

const TagsContainer = styled(Box)({
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '24px',
    gap: '10px 8px',
});

const ContentContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '38px',
});

const SocialButtonContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px',
});

const SectionHeader = styled(Typography)({
    color: '#fff',
    fontSize: '22px',
    fontWeight: '700',
    lineHeight: '26px',
    letterSpacing: '0.3499999940395355px',
});

const InteractionsEventsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '126px',
});

const InteractionContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
});

const SendReactionContainer = styled(Box)({
    marginTop: '24px',
});

const EventsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '38px',

});

const EventsCardsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '24px',
});

const AuthDialog = styled(Dialog)({
    backgroundColor: '#0D1021'
});

const AuthDialogContent = styled(DialogContent)({});

export async function loader({ params }) {
    const streamerUidSnap = await getStreamerUidWithDeepLinkAlias(params.streamerAlias);

    let streamerUid = '';
    let profileDeepLink = '';
    streamerUidSnap.forEach((streamer) => {
        streamerUid = streamer.key;
        profileDeepLink = streamer.val();
    });

    if (!streamerUid) {
        throw new Error('Streamer not found');
    }

    const profile = await getStreamerPublicProfile(streamerUid);

    if (!profile.exists()) {
        throw new Error('Streamer not found');
    }

    const followers = await getStreamerFollowersNumber(streamerUid);
    const isStreaming = await getStreamerIsStreaming(streamerUid);
    const links = await getStreamerLinks(streamerUid);
    const upcomingStreams = await getStreamerStreams(streamerUid);

    return {
        streamerUid,
        ...profile.val(),
        followers: followers.val() ?? 0,
        isStreaming: isStreaming.val(),
        links: links.val() ?? [],
        upcomingStreams: upcomingStreams.val(),
        profileDeepLink
    };
}

const StreamerProfile = () => {
    const {
        streamerUid,
        backgroundGradient,
        backgroundUrl,
        photoUrl,
        displayName,
        followers,
        bio,
        tags,
        links,
        isStreaming,
        upcomingStreams,
        profileDeepLink
    } = useLoaderData();
    const [openShareTooltip, setOpenShareTooltip] = useState(false);
    const [followingStreamer, setFollowingStreamer] = useState(false);
    const [hoverUnfollow, setHoverUnfollow] = useState(false);
    const [openAuthDialog, setOpenAuthDialog] = useState(false);
    const user = useAuth();
    const { t } = useTranslation();

    useEffect(() => {
        if (user && user.id) {
            listenToFollowingStreamer(user.id, streamerUid, (following) => {
                setFollowingStreamer(following.exists());
            });
        }
    }, [user, streamerUid]);

    const getStreamDateData = (timestamp) => {
        const date = new Date(timestamp);

        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const wDay = t(`days.${days[date.getDay()]}`);
        let hour = date.getHours() % 12;
        hour = hour ? hour : 12;
        let minute = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
        const streamHour = `${hour}:${minute}`;
        const hourSuffix = date.getHours() >= 12 ? 'p.m.' : 'a.m.';

        return {
            wDay,
            day: date.getDate(),
            hour: streamHour,
            hourSuffix
        };
    }

    const shareProfileDeepLink = () => {
        navigator.clipboard.writeText(profileDeepLink);
        setOpenShareTooltip(true);
    }

    const startFollowing = async (uid) => {
        if (uid || (user && user.id)) {
            await followStreamer(uid ? uid : user.id, streamerUid);
        } else {
            setOpenAuthDialog(true);
        }
    }

    const handleUnfollow = async () => {
        if (user && user.id) {
            await unfollowStreamer(user.id, streamerUid);
        }
    }

    const handleHoverEnterUnfollow = () => {
        setHoverUnfollow(true);
    }

    const handleHoverLeaveUnfollow = () => {
        setHoverUnfollow(false);
    }

    const signInToFollow = async () => {
        const twitchClientCode = await signInWithTwitchPopUp();
        if (twitchClientCode) {
            // Firebase auth listener might not be that fast, so we send the uid as parameter to the startFollowing function
            await authWithTwitch(twitchClientCode, (user) => startFollowing(user.uid));
            setOpenAuthDialog(false);
        }
    }

    const userLanguage = getCurrentLanguage();
    return (
        <Container>
            <Helmet>
                <title>
                    {displayName} | Creator Profile
                </title>
            </Helmet>
            <ProfileCover style={backgroundUrl ? {
                backgroundImage: `url('${backgroundUrl}')`,
                }
                :
                backgroundGradient ?
                {
                    background: `linear-gradient(${backgroundGradient.angle}deg, ${backgroundGradient.colors[0]} 0%, ${backgroundGradient.colors[1]} 100%)`,
                }
                :
                {
                    background: `linear-gradient(149deg, rgb(45, 7, 250) 0%, rgb(167, 22, 238) 100%)`,
                }
            } />
            <MainContainer>
                <StremerInfoContainer>
                    <ProfilePic style={{
                        backgroundImage: `url('${photoUrl}')`,
                    }} />
                    <StreamerInfoTopContiner>
                        <NameContiner>
                            <NameText>
                                {displayName}
                            </NameText>
                            <FollowersContainer>
                                <FollowersHighlightText>
                                    {followers}
                                </FollowersHighlightText>
                                <FollowersText>
                                    {t('StreamerProfile.followers')}
                                </FollowersText>
                            </FollowersContainer>
                        </NameContiner>
                        <QuickButtonsContainer>
                            <Tooltip open={openShareTooltip} title={t('StreamerProfile.linkCopied')} onClose={() => setOpenShareTooltip(false)}>
                                <ShareButton onClick={shareProfileDeepLink}>
                                    {t('StreamerProfile.share')}
                                    <ShareArrow style={{ marginLeft: '8px' }} />
                                </ShareButton>
                            </Tooltip>
                            {followingStreamer ?
                                <UnfollowButton onMouseEnter={handleHoverEnterUnfollow} onMouseLeave={handleHoverLeaveUnfollow} onClick={handleUnfollow}>
                                    {hoverUnfollow ?
                                        t('StreamerProfile.unfollow')
                                        :
                                        t('StreamerProfile.following')
                                    }
                                </UnfollowButton>
                                :
                                /* (e) => startFollowing() to prevent e to be send as uid paramater for startFollowing */
                                <FollowButton onClick={(e) => startFollowing()}>
                                    {t('StreamerProfile.follow')}
                                </FollowButton>
                            }
                        </QuickButtonsContainer>
                    </StreamerInfoTopContiner>
                    <BioText>
                        {bio}
                    </BioText>
                    <TagsContainer>
                        {tags.map((tag) => (
                            <TagChip key={tag} label={tag} />
                        ))}
                    </TagsContainer>
                    <ContentContainer>
                        <SectionHeader>
                            {t('StreamerProfile.myContent')}
                        </SectionHeader>
                        <SocialButtonContainer>
                            {links.length <= 0 &&
                                <SocialButton
                                    Icon={linksData.Twitch.Icon}
                                    name={'Twitch'}
                                    boxShadowColor={linksData.Twitch.boxShadowColor}
                                    grow={isStreaming}
                                    link={`https://twitch.tv/${displayName.toLowerCase()}`}
                                    openLinkOnSecondClick={isStreaming}>
                                    {isStreaming ?
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}>
                                            <iframe
                                                title='twitch stream'
                                                src={`https://player.twitch.tv/?channel=${displayName.toLowerCase()}&parent=web.qapla.gg&muted=true`}
                                                height="192"
                                                width="342"
                                                allowfullscreen>
                                            </iframe>
                                        </div>
                                        :
                                        null
                                    }
                                </SocialButton>
                            }
                            {links.map((link) => (
                                link.value ?
                                    <SocialButton key={link.socialPage}
                                        Icon={linksData[link.socialPage].Icon}
                                        name={link.socialPage}
                                        boxShadowColor={linksData[link.socialPage].boxShadowColor}
                                        grow={link.socialPage === 'Twitch' && isStreaming}
                                        link={link.value}
                                        openLinkOnSecondClick={isStreaming}>
                                        {link.socialPage === 'Twitch' && isStreaming &&
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}>
                                                <iframe
                                                    title='twitch stream'
                                                    src={`https://player.twitch.tv/?channel=${displayName.toLowerCase()}&parent=web.qapla.gg&muted=true`}
                                                    height="192"
                                                    width="342"
                                                    allowfullscreen>
                                                </iframe>
                                            </div>
                                        }
                                    </SocialButton>
                                    :
                                    null
                            )
                            )}
                        </SocialButtonContainer>
                    </ContentContainer>
                </StremerInfoContainer>
                <InteractionsEventsContainer>
                    <InteractionContainer>
                        <SectionHeader>
                            {t('StreamerProfile.customAlerts')}
                        </SectionHeader>
                        <SendReactionContainer>
                            <SendReaction streamerUid={streamerUid} />
                        </SendReactionContainer>
                    </InteractionContainer>
                    {upcomingStreams &&
                        <EventsContainer>
                            <SectionHeader>
                                {t('StreamerProfile.upcomingStreams')}
                            </SectionHeader>
                            <EventsCardsContainer>
                                {Object.keys(upcomingStreams).slice(0, 2).map((streamId) => (
                                    <StreamCard key={streamId}
                                        backgroundImage={upcomingStreams[streamId].backgroundImage}
                                        title={upcomingStreams[streamId].title[userLanguage]}
                                        {...(getStreamDateData(upcomingStreams[streamId].timestamp))} />
                                ))}
                            </EventsCardsContainer>
                        </EventsContainer>
                    }
                </InteractionsEventsContainer>
            </MainContainer>
            <AuthDialog open={openAuthDialog}
                onClose={() => setOpenAuthDialog(false)}
                maxWidth='sm'>
                <AuthDialogContent>
                    <Button onClick={signInToFollow}>
                        Sign in wit Twitch
                    </Button>
                </AuthDialogContent>
            </AuthDialog>
        </Container>
    );

}

export default StreamerProfile;