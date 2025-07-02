import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Slide from '@mui/material/Slide';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// Import your auth hook/context
import { AuthContext } from '../context/authContext';  // update this path!

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element,
  window: PropTypes.func,
};

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
    if (anchor) {
      anchor.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1500 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function NavigationBar(props) {
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  // Get user from AuthContext
  const { userId,logout } = React.useContext(AuthContext);

  // Menu state for user icon dropdown
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Determine auth by checking if user exists (you can customize this condition)
  const auth = Boolean(userId);  // true if user is logged in

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: isHomepage ? 'transparent' : '#fff',
            color: isHomepage ? '#fff' : '#000',
            boxShadow: 'none',
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontSize: '1.5rem', fontWeight: 500 }}
            >
              <Link to="/" className="montserrat-font" style={{ textDecoration: 'none', color: 'inherit' }}>
                The Furnish
              </Link>
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
              <Button
                component={Link}
                to="/products"
                sx={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 500,
                  color: isHomepage ? 'white' : 'black',
                }}
              >
                Products
              </Button>

              {!auth && (
                <Button
                  component={Link}
                  to="/signup"
                  sx={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 500,
                    color: isHomepage ? 'white' : 'black',
                  }}
                >
                  Sign Up
                </Button>
              )}

              <IconButton
                component={Link}
                to="/cart"
                sx={{ color: isHomepage ? 'white' : 'black' }}
                aria-label="cart"
              >
                <ShoppingCartOutlinedIcon />
              </IconButton>

              {auth && (
                <>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    sx={{color:isHomepage ? 'white' : 'black'}}
                  >
                    <AccountCircle />
                  </IconButton>

                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem component={Link} to="/wishlist" onClick={handleClose}>My Wishlist</MenuItem>
                    <MenuItem component={Link} to="/orders" onClick={handleClose}>My Orders</MenuItem>
                    <MenuItem component={Link}  to ="/" onClick={
                      ()=>{
                      logout();
                      handleClose;
                      }}>Log Out</MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Toolbar id="back-to-top-anchor" sx={{ float: isHomepage ? 'right' : 'none' }} />

      <ScrollTop {...props}>
        <Fab size="small" sx={{ color: '#000' }} aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
