import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => (
  <Box
    className='footer'
    component='footer'
    sx={{ px: 2, height: '100%', display: 'flex', flexDirection: 'col' }}
  >
    <Box
      component='div'
      sx={{
        color: 'white',
        width: '100%',
        alignSelf: 'flex-end',
        backgroundColor: '#376E66',
      }}
    >
      <Typography
        variant='caption'
        component='div'
        align='center'
        sx={{ position: 'relative', zIndex: 10 }}
      >
        &copy;{new Date().getFullYear()}{' '}
        <Link to='https://bluestormcreative.com' target='blank'>
          blue storm creative
        </Link>
      </Typography>
    </Box>
  </Box>
);

export { Footer };
