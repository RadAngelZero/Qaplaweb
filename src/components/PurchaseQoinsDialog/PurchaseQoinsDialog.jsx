import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Button, Checkbox, Dialog, FormControlLabel, FormGroup, Typography, useMediaQuery } from '@mui/material';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

import { getQoinsPackages } from '../../services/database';
import { ReactComponent as PoweredByStripe } from './../../assets/icons/PoweredByStripe.svg';
import { ReactComponent as QoinIcon } from './../../assets/icons/Qoin.svg';
import { ReactComponent as CheckedIcon } from './../../assets/icons/CheckedIcon.svg';
import ThugDoug from './../../assets/gifs/thugDoug.gif';
import GradientGifs from './../../assets/GradientGifs.png';
import { getCurrentLanguage } from '../../utils/i18n';

const NormalQoins = styled(Button)({
    backgroundColor: '#141833',
    borderRadius: 20,
    boxShadow: '0px 10px 30px rgba(8, 13, 41, 0.75)',
    minWidth: '402px',
    minHeight: '165px',
    marginBottom: 24,
    flexDirection: 'column',
    padding: '32px 24px',
    textTransform: 'none'
});

const FeaturedQoins = styled(Button)({
    background: `url(${GradientGifs})`,
    backgroundSize: '100% 100%',
    borderRadius: 20,
    boxShadow: '0px 10px 30px rgba(8, 13, 41, 0.75)',
    minWidth: '402px',
    minHeight: '165px',
    flexDirection: 'column',
    padding: '32px 24px',
    textTransform: 'none'
});

const QoinsText = styled(Typography)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'start',
    width: '100%',
    background: 'linear-gradient(227.05deg, #FFD3FB 9.95%, #F5FFCB 48.86%, #9FFFDD 90.28%), linear-gradient(222.55deg, #FFF394 35.86%, #A46CFF 85.37%), linear-gradient(0deg, #E3E3E3, #E3E3E3), #940DFF',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
});

const CostsText = styled(Typography)({
    fontWeight: '600',
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 16,
    textAlign: 'start',
    width: '100%',
});

const MoreQoinsText = styled(Typography)({
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'start',
    width: '100%',
    background: 'linear-gradient(227.05deg, #FFD3FB 9.95%, #F5FFCB 48.86%, #9FFFDD 90.28%), linear-gradient(222.55deg, #FFF394 35.86%, #A46CFF 85.37%), linear-gradient(0deg, #E3E3E3, #E3E3E3), #940DFF',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginTop: 16
});

const FeaturesContainer = styled(FormGroup)({
    width: '60%',
    marginTop: 24,
    marginBottom: 40
});

const FeaturesCheckbox = styled(Checkbox)({});

const FeaturesCheckboxLabel = styled(FormControlLabel)({
    color: '#FFF'
});

const PurchaseQoinsDialog = ({ open, onClose, uid, email, streamerUid, reactionId }) => {
    const [qoinsPackages, setQoinsPackages] = useState(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { t } = useTranslation();

    useEffect(() => {
        async function getPackages() {
            const packages = await getQoinsPackages();

            if (packages.exists()) {
                setQoinsPackages(packages.val());
            }
        }

        if (!qoinsPackages) {
            getPackages();
        }
    }, [qoinsPackages]);

    const language = getCurrentLanguage();
    return (
        <Dialog open={open}
            PaperProps={{
                style: {
                    backgroundColor: '#141833',
                    borderRadius: 40,
                    alignItems: 'center',
                    justifyContent: 'center'
                }
            }}
            onClose={onClose}
            fullWidth
            fullScreen={fullScreen}
            maxWidth='sm'>
            <PoweredByStripe style={{ transform: 'scale(1.5)', marginTop: 32, marginBottom: 34 }} />
            {qoinsPackages && qoinsPackages['2kQoins'] &&
                <form action='https://us-central1-qapplaapp.cloudfunctions.net/userCheckoutIntent' method='post'>
                    <input type='hidden' name='lookupKey' value={'2kQoins'} />
                    <input type='hidden' name='uid' value={uid} />
                    <input type='hidden' name='streamerUid' value={streamerUid} />
                    <input type='hidden' name='reactionId' value={reactionId} />
                    <input type='hidden' name='email' value={email} />
                    <NormalQoins type='submit'>
                        <QoinsText>
                            {qoinsPackages['2kQoins'].amount.toLocaleString()} <QoinIcon style={{ marginLeft: 10 }} width={32} height={32} />
                        </QoinsText>
                        <CostsText>
                            {t('PurchaseQoinsDialog.qoinsPrice', { price: qoinsPackages['2kQoins'].costs[language] })}
                        </CostsText>
                    </NormalQoins>
                </form>
            }
            {qoinsPackages && qoinsPackages['4kQoinsPlus'] &&
                <form action='https://us-central1-qapplaapp.cloudfunctions.net/userCheckoutIntent' method='post'>
                    <input type='hidden' name='lookupKey' value={'4kQoinsPlus'} />
                    <input type='hidden' name='uid' value={uid} />
                    <input type='hidden' name='streamerUid' value={streamerUid} />
                    <input type='hidden' name='reactionId' value={reactionId} />
                    <input type='hidden' name='email' value={email} />
                    <FeaturedQoins type='submit'>
                        <QoinsText>
                            {qoinsPackages['4kQoinsPlus'].amount.toLocaleString()} <QoinIcon style={{ marginLeft: 10 }} width={32} height={32} />
                        </QoinsText>
                        <CostsText>
                            {t('PurchaseQoinsDialog.qoinsPrice', { price: qoinsPackages['4kQoinsPlus'].costs[language] })}
                        </CostsText>
                        <MoreQoinsText>
                            {t('PurchaseQoinsDialog.moreQoins')}
                        </MoreQoinsText>
                        <img src={ThugDoug} alt='Thug Doug' width={118} height={100} style={{
                            position: 'absolute',
                            right: 30
                        }} />
                    </FeaturedQoins>
                </form>
            }
            <FeaturesContainer>
                <FeaturesCheckboxLabel control={<FeaturesCheckbox checkedIcon={<CheckedIcon />} checked />}
                    label={t('PurchaseQoinsDialog.boostYourReaction')} />
                <FeaturesCheckboxLabel control={<FeaturesCheckbox checkedIcon={<CheckedIcon />} checked />}
                    label={t('PurchaseQoinsDialog.sendFreeReactions')} />
                <FeaturesCheckboxLabel control={<FeaturesCheckbox checkedIcon={<CheckedIcon />} checked />}
                    label={t('PurchaseQoinsDialog.sendExtraTip')} />
            </FeaturesContainer>
        </Dialog>
    );
}

export default PurchaseQoinsDialog;