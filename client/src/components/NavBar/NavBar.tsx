import {
  AppBar,
  IconButton,
  Typography,
  Toolbar,
  useMediaQuery,
  Box,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { LoginWrapper } from '@/components';
import Pomegranate from '@assets/pomegranate.svg?react';
import Broccoli from '@assets/broccoli.svg?react';
import Eggplant from '@assets/eggplant.svg?react';
import Apricot from '@assets/apricot.svg?react';

// Null if user not logged in, but we don't want an optional prop here
type NavBarProps = {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogOutSuccess: () => void;
  onMenuIconClicked: () => void;
};

const NavBar = ({
  onSignUpClicked,
  onLoginClicked,
  onLogOutSuccess,
  onMenuIconClicked,
}: NavBarProps) => {
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          size='large'
          color='inherit'
          aria-label='menu'
          onClick={onMenuIconClicked}
        >
          <Menu />
        </IconButton>
        <Typography
          variant='h6'
          component={Link}
          to='/'
          className='fancy_text logo'
        >
          Seasonly
        </Typography>
        <Box
          sx={{
            ml: '8px',
            display: 'flex',
            gap: '8px',
            svg: { width: '20px', height: 'auto' },
          }}
        >
          <Apricot />
          <Pomegranate />
          <Broccoli />
          <Eggplant />
        </Box>

        {matches ? (
          <LoginWrapper
            onSignUpClicked={onSignUpClicked}
            onLoginClicked={onLoginClicked}
            onLogOutSuccess={onLogOutSuccess}
          />
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export { NavBar };
