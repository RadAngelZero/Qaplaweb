    import React from "react";

    import { Button,  Dialog, Typography, styled, Box } from '@mui/material';

    import iconCheck from '../../assets/icons/TickSquare.svg'

    const ContainerDialog = styled(Box)({
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'space-between',
        maxWidth:'270px',
        height: '300px',
        alignItems: 'center',
    })

    const Text = styled(Typography)({
        fontSize:'18px',
        fontWeight:'600',
        color:'#FFFFFF',
        lineHeight: '24px',
        textAlign: 'center',
    })

    const Icons = styled('img')({
        height: '68px',
        boxShadow: '0px 13px 40px -10px #00FFDD',
        borderRadius: '50%',
        border:'none',
        marginBottom: '10px'
    })

    const ContainerButton = styled(Button)({
        fontSize:'14px',
        color:'#FFFFFF',
        fontWeight:'600',
        backgroundColor: '#3B4BF9',
        borderRadius:'16px',
        height: '56px',
        width: '202px',
        textTransform:'lowercase',
        boxShadow: '0px 20px 40px -10px rgba(59, 75, 249, 0.4)',
        '&:hover':{
            backgroundColor: '#3B4BF9'
        }
    })

    const CloseButton = styled(Button)({
        marginTop:'10px',
        textTransform:'lowercase',
        fontSize:'14px',
        fontWeight:'600'
    })

    const ReactionsDialog = ({open,onClose}) => {

        return(
            <Dialog open={open}
                 PaperProps={{
                     style: {
                        backgroundColor: '#141833',
                        borderRadius: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        maxWidth:'347px',
                        minWidth: '347px',
                        height: '384px',
                 }
            }}
                    onClose={onClose}>
                <ContainerDialog>
                    <Icons src={iconCheck} alt='icon'  />
                    <div style={{marginBottom:'20px'}}> 
                        <h2 style={{textAlign: 'center', color: '#ffffff', fontSize:'18px'}}>Reaction sent!</h2>
                        <Text>You can track your Qoins balance from the mobile app</Text>
                    </div>
                    <div style={{marginTop:'20px', display: 'flex', flexDirection:'column', justifyContent:'center', alignItems: 'center'}}> 
                        <ContainerButton>Download the app</ContainerButton>
                        <CloseButton>I'm good</CloseButton>
                    </div>
                </ContainerDialog>
            </Dialog>
        )
    }

    export default ReactionsDialog