import { Modal, Box, Tooltip, Button, Typography } from "@mui/material"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from "react";
type PropType = {
    openModal: boolean,
    handleCloseModal: () => void,
    text: string
}

const ModelPageForToken = ({openModal, handleCloseModal, text}: PropType) => {

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        });
    };

    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                height: 50,
                bgcolor: 'background.paper',
                border: '2px solid',
                borderColor: 'primary',
                boxShadow: 24,
                p: 4,
            }}>
                <Typography id="modal-modal-description" 
                    sx={{ 
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '1000px',
                        mb: 1
                    }}>
                    {text}
                </Typography>
                <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<ContentCopyIcon />}
                        onClick={handleCopy}
                    />
            </Tooltip>
            </Box>
        </Modal>
    )
}

export default ModelPageForToken