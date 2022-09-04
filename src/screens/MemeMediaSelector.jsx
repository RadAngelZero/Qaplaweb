import React, { useState, useEffect } from 'react';
import { Paper, Container, ImageList, ImageListItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getQaplaMemesLibrary } from '../services/database';
import { MEMES } from '../utils/constants';

const MediaSelectorContainer = styled(Paper)({
    flex: 1,
    backgroundColor: '#141539',
    padding: '16px',
    borderRadius: '0px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    width: '100%',
    maxWidth: '835px',
    WebkitBoxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    boxSizing: 'border-box',
});

const GridContainer = styled(Container)({
    marginTop: '16px',
    padding: '0px !important',
});

const MemeMediaSelector = ({ onMediaSelected }) => {
    const [memes, setMemes] = useState(null);

    useEffect(() => {
        async function getMemes() {
            const memes = await getQaplaMemesLibrary();

            if (memes.exists()) {
                setMemes(memes.val());
            }
        }

        if (!memes) {
            getMemes();
        }
    }, [memes]);

    return (
        <MediaSelectorContainer>
            <GridContainer>
                <ImageList variant="masonry" cols={window.innerWidth <= 320 ? 2 : 3} gap={8}>
                    {memes && Object.keys(memes).map((memeKey) => (
                        <ImageListItem key={memes[memeKey].url} style={{ cursor: 'pointer' }}>
                            <img src={`${memes[memeKey].url}?w=248&fit=crop&auto=format`}
                                onClick={() => onMediaSelected({ type: MEMES, images: { original: memes[memeKey] } })}
                                alt='Qapla Meme'
                                loading="lazy" />
                        </ImageListItem>
                    ))}
                </ImageList>
            </GridContainer>
        </MediaSelectorContainer>
    );
}

export default MemeMediaSelector;