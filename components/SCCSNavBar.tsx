'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const pages = { 'Home': '/', 'Create': '/create' };

function ResponsiveAppBar(props: any) {
    const { data: session, status } = useSession();  

    let authenticated;
    let loginLink;
    let nameButton;
    if (props.hasOwnProperty("login")) {
      loginLink = null
      nameButton = null
    } else {
      if (status === "authenticated") {
        authenticated = true
        loginLink = (
            <MenuItem key="logout">
                <Link href="/api/auth/signout"><Typography textAlign="center">Log out</Typography></Link>
            </MenuItem>
        )
        nameButton = session.user?.name
      } else {
        authenticated = false
        loginLink = (
            <></>
        )
        nameButton = "Log In"
      }
    }

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" enableColorOnDark>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                        className="text-white transition-colors duration-200 ease-in-out hover:text-accent"
                    >
                        TickFlow
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {Object.entries(pages).map(([page, link]) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Link href={link}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        TickFlow
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {Object.entries(pages).map(([page, link]) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    variant="text"
                                    sx={{ my: 2, display: 'block' }}
                                >
                                    <Link href={link} className="text-white transition-colors duration-200 ease-in-out hover:text-accent">
                                        {page}
                                    </Link>
                                </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="User settings">
                            <Button variant="text" onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Link href={authenticated ? "" : "/api/auth/signin"} className="text-white transition-colors duration-200 ease-in-out hover:text-accent">
                                    {nameButton}
                                </Link>
                            </Button>
                        </Tooltip>
                        {authenticated ? <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {loginLink}
                        </Menu> : <></>}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
