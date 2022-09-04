import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Dialog } from '@mui/material';

const EmojiSelector = ({ onEmojiSelected, open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} PaperProps={{
            style: {
                backgroundColor: 'transparent'
            }
        }}>
            <Picker autofocus
                theme='dark'
                skinTonePosition='search'
                previewPosition='none'
                data={data}
                onEmojiSelect={onEmojiSelected} />
        </Dialog>
    );
}

export default EmojiSelector;