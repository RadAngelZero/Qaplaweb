import { useState, useEffect, useMemo } from 'react';
import { Button, Box, styled, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

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
import { getStreamerFollowersNumber, getStreamerIsStreaming, getStreamerLinks, getStreamerPublicProfile, getStreamerStreams } from '../services/database';
import { getCurrentLanguage } from '../utils/i18n';

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

const StreamerProfile = ({ streamerUid }) => {
    const [coverImage, setCoverImage] = useState('');
    const [streamerImg, setStreamerImg] = useState('')
    const [streamerName, setStreamerName] = useState('');
    const [followers, setFollowers] = useState(0);
    const [bio, setBio] = useState('');
    const [tags, setTags] = useState([]);
    const [links, setLinks] = useState([]);
    const [isStreaming, setIsStreaming] = useState(false);
    const [upcomingStreams, setUpcomingStreams] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        async function loadStreamerData() {
            const profile = await getStreamerPublicProfile(streamerUid);
            setCoverImage(profile.val().backgroundUrl);
            setStreamerImg(profile.val().photoUrl);
            setStreamerName(profile.val().displayName);
            setBio(profile.val().bio);
            setTags(profile.val().tags);
            setDataFetched(true);

            const followers = await getStreamerFollowersNumber(streamerUid);
            setFollowers(followers.val() ?? 0);

            const isStreaming = await getStreamerIsStreaming(streamerUid);
            setIsStreaming(isStreaming.val());

            const links = await getStreamerLinks(streamerUid);
            setLinks(links.val() ?? []);

            const upcomingStreams = await getStreamerStreams(streamerUid);
            setUpcomingStreams(upcomingStreams.val());
        }

        if (!dataFetched) {
            loadStreamerData();
        }
    }, []);

    const getStreamDateData = (timestamp) => {
        const date = new Date(timestamp);

        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const wDay = days[date.getDay()];
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

    const userLanguage = getCurrentLanguage();
    return (
        <Container>
            <ProfileCover style={{
                backgroundImage: `url('${coverImage}')`,
            }} />
            <MainContainer>
                <StremerInfoContainer>
                    <ProfilePic style={{
                        backgroundImage: `url('${streamerImg}')`,
                    }} />
                    <StreamerInfoTopContiner>
                        <NameContiner>
                            <NameText>
                                {streamerName}
                            </NameText>
                            <FollowersContainer>
                                <FollowersHighlightText>
                                    {followers}
                                </FollowersHighlightText>
                                <FollowersText>
                                    Followers
                                </FollowersText>
                            </FollowersContainer>
                        </NameContiner>
                        <QuickButtonsContainer>
                            <ShareButton>
                                Share
                                <ShareArrow style={{ marginLeft: '8px' }} />
                            </ShareButton>
                            <FollowButton>
                                Follow
                            </FollowButton>
                        </QuickButtonsContainer>
                    </StreamerInfoTopContiner>
                    <BioText>
                        {bio}
                    </BioText>
                    <TagsContainer>
                        {tags.map(tag => {
                            return (<TagChip label={tag} />)
                        })}
                    </TagsContainer>
                    <ContentContainer>
                        <SectionHeader>
                            My content
                        </SectionHeader>
                        <SocialButtonContainer>
                            {links.length <= 0 &&
                                <SocialButton
                                    Icon={linksData.Twitch.Icon}
                                    name={'Twitch'}
                                    boxShadowColor={linksData.Twitch.boxShadowColor}
                                    grow={isStreaming}
                                    link={`https://twitch.tv/${streamerName.toLowerCase()}`}
                                    openLinkOnSecondClick={isStreaming}>
                                        {isStreaming ?
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}>
                                                <iframe
                                                    title='twitch stream'
                                                    src={`https://player.twitch.tv/?channel=${streamerName.toLowerCase()}&parent=localhost&muted=true`}
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
                                    <SocialButton
                                        Icon={linksData[link.socialPage].Icon}
                                        name={link.socialPage}
                                        boxShadowColor={linksData[link.socialPage].boxShadowColor}
                                        grow={link.socialPage === 'Twitch' && isStreaming}
                                        link={link.value}
                                        openLinkOnSecondClick={isStreaming}>
                                        {link.socialPage === 'Twitch' &&
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}>
                                                <iframe
                                                    title='twitch stream'
                                                    src={`https://player.twitch.tv/?channel=${streamerName.toLowerCase()}&parent=localhost&muted=true`}
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
                            Custom alerts on stream
                        </SectionHeader>
                        <SendReactionContainer>
                            <SendReaction />
                        </SendReactionContainer>
                    </InteractionContainer>
                    {upcomingStreams &&
                        <EventsContainer>
                            <SectionHeader>
                                Upcoming streams
                            </SectionHeader>
                            <EventsCardsContainer>
                                {Object.keys(upcomingStreams).slice(0, 2).map((streamId) => (
                                    <StreamCard
                                        backgroundImage={upcomingStreams[streamId].backgroundImage}
                                        title={upcomingStreams[streamId].title[userLanguage]}
                                        {...(getStreamDateData(upcomingStreams[streamId].timestamp))} />
                                ))}
                            </EventsCardsContainer>
                        </EventsContainer>
                    }
                </InteractionsEventsContainer>
            </MainContainer>
        </Container>
    );

}

export default StreamerProfile;