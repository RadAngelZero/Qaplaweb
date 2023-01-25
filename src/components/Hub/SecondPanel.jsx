import { Box, styled } from "@mui/material";

const SecondPanelContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    flex: 8,
    backgroundColor: '#0D1021B2',
    borderRadius: '20px',
    backdropFilter: 'blur(25px)',
    padding: '48px',
    webkitBoxSizing: 'border-box',
    mozBoxSizing: 'border-box',
    boxSizing: 'border-box',
    border: '3px solid rgba(13, 16, 33, 0.35)',
    boxShadow: '0px 20px 100px 30px rgba(0, 0, 0, 0.35)',
    overflow: 'hidden'
});
const SecondPanel = ({ children, style }) => {

    return (<SecondPanelContainer style={style}>
        {children}
    </SecondPanelContainer>)
}

export default SecondPanel;