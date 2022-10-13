import { useState, useEffect, useMemo } from 'react';
import { Button, Box, styled, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ReactComponent as ShareArrow } from '../assets/ShareArrow.svg';
import { ReactComponent as TwitchIcon } from '../assets/TwitchLight.svg';
import { ReactComponent as YouTube } from '../assets/YouTube.svg';
import { ReactComponent as Twitter } from '../assets/Twitter.svg';
import { ReactComponent as TikTok } from '../assets/TikTok.svg';
import { ReactComponent as Instagram } from '../assets/Instagram.svg';
import { ReactComponent as Discord } from '../assets/Discord.svg';


import TagChip from '../components/TagChip/TagChip';
import SendReaction from '../components/SendReaction/SendReaction';
import StreamCard from '../components/StreamCard/StreamCard';
import SocialButton from '../components/SocialButton/SocialButton';

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

const StreamerProfile = () => {
    const [coverImage, setCoverImage] = useState('https://i.pinimg.com/736x/74/20/22/742022ecfce4172ce0e81beb64ce434d.jpg');
    const [streamerImg, setStreamerImg] = useState('https://static-cdn.jtvnw.net/jtv_user_pictures/b93a50c9-ce51-462b-89d2-765979b3087f-profile_image-70x70.png')
    const [streamerName, setStreamerName] = useState('Streamer');
    const [followers, setFollowers] = useState(0);
    const [bio, setBio] = useState('Soy Lunna, Scream Queen por excelencia, tarotista, fan del terror y los Sims. Streamer de CDMX y comunity manager de ExitLag');
    const [tags, setTags] = useState(['Terror', 'Shooter', 'Tarot', 'Just Dance', 'Just Chatting']);

    return (<Container>
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
                        <SocialButton
                            Icon={<TwitchIcon />}
                            name={'Twitch'}
                            boxShadowColor={'#9146FF'}
                            grow
                            link={'https://www.twitch.tv/agentemaxo'}
                            openLinkOnSecondClick
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                                <iframe
                                    title='twitch stream'
                                    src="https://player.twitch.tv/?channel=agentemaxo&parent=localhost&muted=true"
                                    height="192"
                                    width="342"
                                    allowfullscreen>
                                </iframe>
                            </div>
                        </SocialButton>
                        <SocialButton
                            Icon={<YouTube />}
                            name={'YouTube'}
                            boxShadowColor={'#FF0000'}
                            link={'https://www.youtube.com/'}
                        />
                        <SocialButton
                            Icon={<Twitter />}
                            name={'Twitter'}
                            boxShadowColor={'#1DA1F2'}
                        />
                        <SocialButton
                            Icon={<TikTok />}
                            name={'TikTok'}
                            boxShadowColor={'#EE1D52'}
                        />
                        <SocialButton
                            Icon={<Instagram />}
                            name={'Instagram'}
                            boxShadowColor={'#E700AB'}
                        />
                        <SocialButton
                            Icon={<Discord />}
                            name={'Discord'}
                            boxShadowColor={'#5865F2'}
                        />
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
                <EventsContainer>
                    <SectionHeader>
                        Upcoming streams
                    </SectionHeader>
                    <EventsCardsContainer>
                        <StreamCard
                            backgroundImage={'https://cdn.discordapp.com/attachments/971988981027835966/971989033599258654/3DBD_Figma.jpg '}
                            title={'Asesinando gente, en el dbd para probar texto con salto de lineaa'}
                            wDay={'Friday'}
                            day={'13'}
                            hour={'11:11'}
                            hourSuffix={'p.m.'}
                        />
                        <StreamCard
                            backgroundImage={'https://media.discordapp.net/attachments/973315961266503750/973316072293928970/6Tarot_Figma.jpg '}
                            title={'Leyendo tu fortuna'}
                            wDay={'Sunday'}
                            day={'15'}
                            hour={'11:11'}
                            hourSuffix={'p.m.'}
                        />
                    </EventsCardsContainer>
                </EventsContainer>
            </InteractionsEventsContainer>
        </MainContainer>
    </Container>)

}

export default StreamerProfile;