import { useState, useEffect } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Video } from '@giphy/react-components';

import { GIPHY_CLIPS, GIPHY_GIFS, GIPHY_STICKERS, MEMES } from '../../utils/constants';
import { ReactComponent as QoinIcon } from '../../assets/icons/Qoin.svg';

const gf = new GiphyFetch('Kb3qFoEloWmqsI3ViTJKGkQZjxICJ3bi');

const CheerPreview = ({ donation }) => {
    const [clip, setClip] = useState(null);

    useEffect(() => {
        const getClip = async () => {
            const { data } = await gf.gif(donation.media.id);
            setClip(data);
        }

        if ((donation.media && (donation.media.type === GIPHY_CLIPS || donation.media.type === 'video') && donation.media.id)) {
            getClip();
        }
    }, [clip, donation]);

    return (
        <div style={{
            padding: 16
        }}>
            {donation.media &&
                <>
                {donation.media && (donation.media.type === MEMES || donation.media.type === GIPHY_GIFS || donation.media.type === 'gif' || donation.media.type === GIPHY_STICKERS || donation.media.type === 'sticker') ?
                    <img src={donation.media.url} alt='' style={{
                        aspectRatio: donation.media.width / donation.media.height,
                        display: 'flex',
                        alignSelf: 'flex-end',
                        maxHeight: '20vh',
                        objectFit: 'scale-down'
                    }} />
                    :
                    <div style={{
                        display: 'flex',
                        aspectRatio: 480 / 480,
                        alignSelf: 'flex-end',
                        maxHeight: '20vh',
                        objectFit: 'scale-down'
                    }}>
                        {clip &&
                            <Video hideAttribution gif={clip} height={window.innerHeight * .2} muted={true} loop={true} controls />
                        }
                    </div>
                }
                </>
            }
            {donation.messageExtraData && donation.messageExtraData.giphyText &&
                <img src={donation.messageExtraData.giphyText.images.original.url} alt='' style={{
                    aspectRatio: donation.messageExtraData.giphyText.images.original.width / donation.messageExtraData.giphyText.images.original.height,
                    display: 'flex',
                    alignSelf: 'flex-end',
                    maxHeight: '20vh',
                    objectFit: 'scale-down'
                }} />
            }
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 5,
                    width: 'fit-content',
                    backgroundColor: '#4D00FB',
                    marginLeft: '0px',
                    marginRight: '-30px',
                    borderRadius: '30px',
                    padding: '8px 8px',
                    alignSelf: 'flex-end',
                    zIndex: 10
                }}
            >
                <div style={{ display: 'flex', alignSelf: 'center' }}>
                    <p style={{
                        display: 'flex',
                        color: 'white',
                        fontSize: '12px',
                        textAlign: 'center'
                    }}>
                        <b style={{ color: '#0AFFD2' }}>{`${donation.twitchUserName} `}</b>
                        {donation.amountQoins ?
                            <>
                            <div style={{ margin: '0 6px' }}>has sent you</div>
                            <b style={{ color: '#0AFFD2', fontWeight: '700', }}>
                                {`${donation.amountQoins.toLocaleString()} Qoins`}
                            </b>
                            </>
                            :
                            <b style={{ color: '#FFF', fontWeight: '700', margin: '0 6px' }}>
                                reacted
                            </b>
                        }
                    </p>
                </div>
                {donation.amountQoins ?
                    <>
                    <div style={{ width: '5px' }}></div>
                    <div style={{ display: 'flex', alignSelf: 'center' }}>
                        <QoinIcon style={{ display: 'flex', width: '20px', height: '20px' }} />
                    </div>
                    </>
                    :
                    null
                }
            </div>
            {(donation.message && !(donation.messageExtraData && donation.messageExtraData.giphyText)) &&
                <div style={{
                    display: 'flex',
                    width: 'fit-content',
                    backgroundColor: '#FFFFFF',
                    marginTop: '-5px',
                    borderRadius: '30px',
                    padding: '9px',
                    alignSelf: 'flex-end'
                }}>
                    <p style={{
                        display: 'flex',
                        color: '#0D1021',
                        fontSize: '10px',
                        fontWeight: '600',
                        lineHeight: '10px',
                        letterSpacing: '0.6px'
                    }}>
                        {donation.message}
                    </p>
                </div>
            }
        </div>
    );
}

export default CheerPreview;