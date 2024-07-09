import { Box, Typography } from '@mui/material'

const Header = () => {
  return (
    <Box sx={{bgcolor:'secondary.main', height: 40}}>
       <Typography variant="h5" align="center" fontWeight="bold" color='secondary.contrastText'>
        ROOF REPLACEMENT ESTIMATOR
      </Typography>
    </Box>
  )
}

export default Header