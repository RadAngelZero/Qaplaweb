import { Button, Box, styled, Typography } from '@mui/material';

import SecondPanel from "../../components/Hub/SecondPanel"
import ThirdPanel from "../../components/Hub/ThirdPanel"

import reactOnTheGo from '../../assets/Reactonthego.png';
import { ReactComponent as DownloadQR } from '../../assets/DownloadQR.svg';

const ReactOnTheGo = styled('img')({
    width: '240px',
    alignSelf: 'center',
});

const DownloadQRContainer = styled(Box)({
    display: 'flex',
    alignSelf: 'center',
    backgroundColor: '#fff',
});

const ScanQRText = styled('p')({
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '19px',
    textAlign: 'center',
    alignSelf: 'center',
    maxWidth: '250px',
});

const ThirdPanelTitle = styled('p')({
    color: '#fff',
    fontSize: '16px',
    fontWeight: '700',
    lineHeight: '19px',
});

const ThirdPanelSubtitle = styled('p')({
    color: '#fff',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '17px',
    // maxWidth: '216px',
});


const Download = () => {
    return (<>
        <SecondPanel style={{
            justifyContent: 'space-between',
        }}>
            <ReactOnTheGo src={reactOnTheGo} />
            <DownloadQRContainer id='download-qr-container' style={{
                transform: `scale(2.5)`,
            }}>
                <DownloadQR id='download-qr' />
            </DownloadQRContainer>
            <style>
                {`
                    #download-qr-container {
                        animation: backgroundtransition 10s infinite;
                    }

                    @keyframes backgroundtransition {
                        0% {
                            background-color: #00FFDD;
                        }
                        25% {
                            background-color: #3B4BF9;
                        }
                        50% {
                            background-color: #FF77A8;
                        }
                        75% {
                            background-color: #7000FF;
                        }
                        100% {
                            background-color: #00FFDD;
                        }
                    }
                `}
            </style>
            <ScanQRText>
                Scan the QR code with your phone to download the app
            </ScanQRText>
        </SecondPanel>
        <ThirdPanel>
            <ThirdPanelTitle>☝️ Avatar Tip:</ThirdPanelTitle>
            <ThirdPanelSubtitle><b>Claim you avatar</b> at the end of the process so you can edit it on other browsers and our mobile app.</ThirdPanelSubtitle>
        </ThirdPanel>
    </>)
}

export default Download;