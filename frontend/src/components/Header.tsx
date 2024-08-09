import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import ArticleIcon from '@mui/icons-material/Article';
import { AuthContext, AuthContextType } from './AuthProvider';
import { useContext } from 'react';

const Header : React.FC = () => {
  const navigate = useNavigate();
  const {isLoggedIn, logout} = useContext<AuthContextType>(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box sx={{ bgcolor: 'primary.main', height: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center',  padding: '0 10px' }}>
      <Typography variant="h5" fontWeight="bold" color="secondary.contrastText" align="center">
        ROOF REPLACEMENT ESTIMATOR
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title="View Estimate">
        <IconButton sx={{color: 'white'}} size="small" aria-label="view" onClick={() => navigate('/view-estimate')}>
            <ArticleIcon />
        </IconButton>
      </Tooltip>
      {
        isLoggedIn && (
          <>
            <Button
              variant="contained"
              size="medium"
              onClick={() => navigate('/estimate')}
              sx={{ ml: 2 }}
            >
              Create Estimate
            </Button>
            <Button
              variant="contained"
              size="medium"
              onClick={() => navigate('/estimates')}
              sx={{ ml: 2 }}
            >
              Estimates
            </Button>
            <IconButton aria-label="logout" onClick={handleLogout} sx={{ ml: 1 }}>
              <Typography variant="button" fontWeight="bold" color="secondary.contrastText">
                Logout
              </Typography>
              <LogoutIcon sx={{ color: 'secondary.contrastText', ml: 0.5 }} />
            </IconButton>
          </>
        )
      }
      </Box>
    </Box>
  );
};

export default Header;
