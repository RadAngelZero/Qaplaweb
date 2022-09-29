import { useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Dialog, Tabs, Tab, Typography, Box, ImageList, ImageListItem, CircularProgress } from '@mui/material';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

import { ReactComponent as LockIcon } from '../assets/icons/Lock.svg';

const TabButton = styled((props) => <Tab disableRipple {...props} />)({
    textTransform: 'none',
    borderBottom: 'none',
    borderRadius: 6,
    padding: '6px 12px',
    minHeight: '34px',
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
    '& .MuiTabs-indicator': {
        backgroundColor: 'transparent'
    },
    '&.Mui-selected': {
        background: '#29326B',
        color: '#FFF',
        borderBottom: 'none'
      },
});

const EmoteCategoryTitle = styled(Typography)({
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: '19px',
    marginTop: 24,
    marginBottom: 16
});

const ListsContainer = styled(Box)({
    height: '435px',
    minHeight: '230px',
    overflowY: 'scroll',
    width: '352px'
});

const LoaderContainer = styled(Box)({
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
});

const EmojiSelector = ({ onEmojiSelected, open, onClose, emotes, onEmoteSelected, userStreamerRelation }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const { t } = useTranslation();

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{
            style: {
                backgroundColor: '#141833',
                paddingTop: '32px',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingBottom: '16px'
            }
        }}>
            <Tabs indicatorColor='' centered value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
                <TabButton label='Emotes' />
                <TabButton label='Emojis' />
            </Tabs>
            <ListsContainer>
                {selectedTab === 0 && emotes &&
                    emotes.map((emoteCategory) => {
                        if (emoteCategory.data[0].length > 0) {
                            return (
                                <div style={{ width: '100%' }}>
                                    <EmoteCategoryTitle>
                                        {t(`EmojiSelector.emotesCategories.${emoteCategory.key}`)}
                                    </EmoteCategoryTitle>
                                    <ImageList cols={5} gap={16}>
                                        {emoteCategory.data[0].map((emote) => {
                                            let locked = false;
                                            switch (emoteCategory.key) {
                                                case 'follower':
                                                    locked = !userStreamerRelation.isFollower;
                                                    break;
                                                case 'subTier1':
                                                    locked = !userStreamerRelation.isSubscribed;
                                                    break;
                                                case 'subTier2':
                                                    locked = !userStreamerRelation.isSubscribed || userStreamerRelation.subscriptionTier < 2000;
                                                    break;
                                                case 'subTier3':
                                                    locked = !userStreamerRelation.isSubscribed || userStreamerRelation.subscriptionTier < 3000;
                                                    break;
                                                default:
                                                    break;
                                            }

                                            return (
                                                <ImageListItem key={emote.id}
                                                    component='button'
                                                    disabled={locked}
                                                    onClick={() => onEmoteSelected(emote.images.url_4x)}
                                                    style={{ alignItems: 'center', padding: 0, border: 'none', backgroundColor: 'transparent', margin: 0 }}>
                                                    <img style={{ opacity: locked ? 0.5 : 1, width: '56px', height: '56px' }} src={emote.images.url_4x} />
                                                    {locked &&
                                                        <LockIcon style={{
                                                            position: 'absolute',
                                                            bottom: 0,
                                                            right: 0,
                                                        }} />
                                                    }
                                                </ImageListItem>
                                            );
                                        })}
                                    </ImageList>
                                </div>
                            );
                        }
                    })
                }
                {selectedTab === 0 && !emotes &&
                    <LoaderContainer>
                        <CircularProgress sx={{
                            color: '#00FFDD'
                        }} />
                    </LoaderContainer>
                }
                {selectedTab === 1 &&
                    <Picker autofocus
                        theme='dark'
                        skinTonePosition='search'
                        previewPosition='none'
                        data={data}
                        onEmojiSelect={onEmojiSelected} />
                }
            </ListsContainer>
        </Dialog>
    );
}

export default EmojiSelector;