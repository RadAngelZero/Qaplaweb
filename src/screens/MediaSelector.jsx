import React, { useState, useRef, useEffect } from 'react';
import { InputBase, Paper, Container, Box, ImageList, ImageListItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';

import { ReactComponent as SearchIcon } from '../assets/icons/Search.svg';
import { GIPHY_TEXT } from '../utils/constants';

const gf = new GiphyFetch('Kb3qFoEloWmqsI3ViTJKGkQZjxICJ3bi');

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

const SearchContainer = styled(Paper)({
    position: 'sticky',
    top: 16,
    zIndex: 1000,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#0D1021',
    height: '40px',
    padding: '0px 16px',
    borderRadius: '50px',
    minWidth: '260px',
});

const SearchInput = styled(InputBase)({
    flex: 1,
    color: '#fff',
    marginLeft: '10px',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '28px',
    letterSpacing: '1px',
    verticalAlign: 'middle',
});

const GiphyLogo = styled(Box)({

})

const GridContainer = styled(Container)({
    marginTop: '16px',
    padding: '0px !important',
});

const MediaSelector = ({ mediaType, onMediaSelected, setMessage }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [giphyText, setGiphyText] = useState([]);
    const searchInput = useRef(null);
    useEffect(() => {
        focusSearch();
    }, []);

    const fetchSearch = (offset) => gf.search(searchTerm, { offset, limit: 50, type: mediaType, rating: 'pg-13' });
    const fetchTrending = (offset) => gf.trending({ offset, type: mediaType, limit: 20, rating: 'pg-13' });

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        if (mediaType === GIPHY_TEXT) {
            loadGIphyText(e.target.value);
        }
    }

    const loadGIphyText = async (text) => {
        const giphyText = await gf.animate(text, { limit: 50, type: mediaType });
        setGiphyText(giphyText.data);
    }

    const focusSearch = () => {
        searchInput.current.childNodes[0].focus();
    }

    const onGiphyTextSelected = (giphyText) => {
        console.log(giphyText);
        onMediaSelected(giphyText);
        setMessage(searchTerm);
    }

    return (
        <MediaSelectorContainer>
            <SearchContainer elevation={12} onClick={focusSearch}>
                <SearchIcon style={{ opacity: 0.6 }} />
                <SearchInput value={searchTerm}
                    onChange={handleSearch}
                    placeholder={mediaType !== GIPHY_TEXT ? `Search Giphy` : 'Type to create'}
                    ref={searchInput}
                    id='searchInput'
                    inputProps={{
                    maxLength: 50
                    }} />
                {searchTerm === '' &&
                    <GiphyLogo component='img' src={require('../assets/images/PoweredbyGiphy.png')} onClick={focusSearch} />
                }
            </SearchContainer>
            <GridContainer>
                {mediaType === GIPHY_TEXT && giphyText.length > 0 ?
                    <ImageList cols={window.innerWidth <= 320 ? 2 : 3} gap={8}>
                        {giphyText.map((giphyText) => (
                            <ImageListItem key={giphyText.id} style={{ cursor: 'pointer' }}>
                                <img src={`${giphyText.images.fixed_width_small.url}?w=248&fit=crop&auto=format`}
                                    onClick={() => onGiphyTextSelected(giphyText)}
                                    height={giphyText.images.fixed_width_small.height}
                                    width={giphyText.images.fixed_width_small.width}
                                    style={{ color: 'transparent' }}
                                    alt='Giphy text'
                                    loading="lazy" />
                            </ImageListItem>
                        ))}
                    </ImageList>
                :
                    <Grid
                        width={window.innerWidth <= 320 ? 300 : 570}
                        columns={window.innerWidth <= 320 ? 2 : 3}
                        gutter={8}
                        fetchGifs={searchTerm === '' ? fetchTrending : fetchSearch}
                        onGifClick={onMediaSelected}
                        key={searchTerm}
                        hideAttribution
                        noLink />
                }
            </GridContainer>
        </MediaSelectorContainer>
    );
}

export default MediaSelector;