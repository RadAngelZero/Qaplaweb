import { Box, styled } from "@mui/material";

const ThirdPanelContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    flex: 2,
    backgroundColor: '#0D1021B2',
    borderRadius: '20px',
    backdropFilter: 'blur(25px)',
    padding: '48px',
    webkitBoxSizing: 'border-box',
    mozBoxSizing: 'border-box',
    boxSizing: 'border-box',
    height: 'min-content',
    alignContent: 'center',
    border: '3px solid rgba(13, 16, 33, 0.35)',
    boxShadow: '0px 20px 100px 30px rgba(0, 0, 0, 0.35)',
});

const ThirdPanel = ({ children, style }) => {

    return (<ThirdPanelContainer style={style}>
        {children}
    </ThirdPanelContainer>)
}

export default ThirdPanel;