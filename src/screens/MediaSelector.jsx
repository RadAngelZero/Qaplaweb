import React, { useState, useRef } from 'react';
import { InputBase, Paper, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';

import { ReactComponent as SearchIcon } from '../assets/icons/Search.svg';

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
    top: '82px',
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

const MediaSelector = ({ mediaType, onMediaSelected }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const searchInput = useRef(null);
    const mainContainer = useRef(null);

    const fetchSearch = (offset) => gf.search(searchTerm, { offset, limit: 50, type: mediaType, rating: 'pg-13' });
    const fetchTrending = (offset) => gf.trending({ offset, type: mediaType, limit: 20, rating: 'pg-13' });

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    const focusSearch = () => {
        searchInput.current.childNodes[0].focus();
    }

    return (<>
        <MediaSelectorContainer ref={mainContainer}>
            <SearchContainer elevation={12} onClick={focusSearch}>
                <SearchIcon style={{ opacity: 0.6 }} />
                <SearchInput onChange={handleSearch} value={searchTerm} placeholder={`Search Giphy`} ref={searchInput} id='searchInput' />
                {searchTerm === '' &&
                    <GiphyLogo component='img' src={require('../assets/images/PoweredbyGiphy.png')} onClick={focusSearch} />
                }
            </SearchContainer>
            <GridContainer>
                <Grid
                    width={mainContainer.current ? mainContainer.current.offsetWidth <= 600 ? mainContainer.current.offsetWidth * 0.9 : mainContainer.current.offsetWidth * 0.95 : 0}
                    columns={mainContainer.current ? mainContainer.current.offsetWidth <= 600 ? mainContainer.current.offsetWidth <= 400 ? 2 : 3 : 4 : 0}
                    gutter={8}
                    fetchGifs={searchTerm === '' ? fetchTrending : fetchSearch}
                    onGifClick={onMediaSelected}
                    key={searchTerm}
                    hideAttribution
                    noLink />
            </GridContainer>
        </MediaSelectorContainer>
    </>)
}

export default MediaSelector;