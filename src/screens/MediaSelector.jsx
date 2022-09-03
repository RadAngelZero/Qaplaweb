import React, { useState } from 'react';
import { InputBase, Paper, TextField, Container, Box } from '@mui/material';
import { ThemeProvider, createTheme, alpha, styled } from '@mui/material/styles'
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
});

const SearchContainer = styled(Paper)({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#0D1021',
    height: '40px',
    padding: '0px 16px',
    borderRadius: '50px',
});

const SearchInput = styled(InputBase)({
    flex: 1,
    color: '#fff',
    marginLeft: '10px',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '28px',
    letterSpacing: '1px',
    verticalAlign: 'center',
});

const GiphyLogo = styled(Box)({

})

const GridContainer = styled(Container)({
    marginTop: '16px',
    padding: '0px !important',
});

const MediaSelector = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    var fetchSearch = ({ offset }) => gf.search(searchTerm, { offset, limit: 50, type: 'gifs', rating: 'pg-13' });
    var fetchTrending = ({ offset }) => gf.trending({ offset, type: 'gifs', limit: 20, rating: 'pg-13' });

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleClickSelection = (e) => {
        console.log(e);
    }

    return (<>
        <MediaSelectorContainer>
            <SearchContainer>
                <SearchIcon style={{ opacity: 0.6 }} />
                <SearchInput onChange={handleSearch} value={searchTerm} placeholder={`Search Giphy`} />
                <GiphyLogo component='img' src={require('../assets/images/PoweredbyGiphy.png')} />
            </SearchContainer>
            <GridContainer>
                <Grid width={356} columns={2} gutter={8} fetchGifs={searchTerm === '' ? fetchTrending : fetchSearch} onGifClick={handleClickSelection} noLink key={searchTerm} hideAttribution />
            </GridContainer>
        </MediaSelectorContainer>
    </>)
}

export default MediaSelector;