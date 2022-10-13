import React, { useEffect, useState } from "react";

import { styled, Box, Typography, Button, Backdrop, Collapse } from '@mui/material';

import { ReactComponent as ShowArrow } from '../../assets/ShowArrow.svg';
import { ReactComponent as ExternalLink } from '../../assets/ExternalLink.svg';

const ButtonContainer = styled(Button)({
    width: '100%',
    height: '92px',
    backgroundColor: '#000000',
    // backdropFilter: "blur(20px)",
    display: 'flex',
    flexDirection: 'column',
    padding: '28px 24px',
    textTransform: 'none',
    webkitBoxSizing: 'border-box', /* Safari/Chrome, other WebKit */
    mozBoxSizing: 'border-box',    /* Firefox, other Gecko */
    boxSizing: 'border-box',         /* Opera/IE 8+ */
    '&:hover': {
        backgroundColor: '#0000',
    }
});

const CollapseContainer = styled(Collapse)({
    width: '550px',
    backgroundColor: '#000000',
    backdropFilter: "blur(20px)",
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '24px',
    marginLeft: '10px',
    boxShadow: '-10px 10px 0px #3B4BF9',
    textTransform: 'none',
    webkitBoxSizing: 'border-box', /* Safari/Chrome, other WebKit */
    mozBoxSizing: 'border-box',    /* Firefox, other Gecko */
    boxSizing: 'border-box',         /* Opera/IE 8+ */
    overflow: 'hidden',
});

const ButtonAlwaysContent = styled(Box)({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
})

const Text = styled(Typography)({
    fontWeight: '600',
    fontSize: '21px',
    lineHeight: '22px',
    textAlign: 'center',
    letterSpacing: '-0.408px',
    color: '#FFFFFF',
    textTransform: 'none',
});

const ChildrenContainer = styled(Box)({
    padding: '0px 24px',
    paddingBottom: '28px',
    // marginTop: '-16px'
});

const SocialButton = ({ Icon, name, boxShadowColor, children, link, grow, openLinkOnSecondClick }) => {
    const [open, setOpen] = useState(false);

    const HandlePress = () => {
        if (link && (!grow || (grow && (open && openLinkOnSecondClick)))) {
            window.open(link, '_blank', 'noopener,noreferrer');
            return;
        }
        if (grow) {
            setOpen((prev) => !prev);
        }
    };

    return (
        <CollapseContainer style={{ boxShadow: `-10px 10px 0px ${boxShadowColor}` }} collapsedSize={92} in={open} >
            <ButtonContainer disableRipple onClick={() => {
                HandlePress();
            }}>
                <ButtonAlwaysContent>
                    <div style={{ display: 'flex' }}>
                        {/* <img src={icon} alt='icons' /> */}
                        {Icon}
                    </div>
                    <div style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text>{name}</Text>
                    </div>
                    <div style={{ justifySelf: 'flex-end', display: 'flex', width: '32px', placeContent: 'center' }}>
                        {openLinkOnSecondClick && open ?
                            <ExternalLink />
                            :
                            <>
                                {grow &&
                                    <ShowArrow style={{
                                        transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
                                    }} />
                                }
                            </>
                        }
                    </div>
                </ButtonAlwaysContent>
            </ButtonContainer>
            <ChildrenContainer>
                {children}
            </ChildrenContainer>
        </CollapseContainer >
    )
}

export default SocialButton;