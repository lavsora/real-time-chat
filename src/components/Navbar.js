import React, { useContext } from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button, Grid } from "@material-ui/core";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";
import SelectLanguages from './SelectLanguages'
import { LangContext } from './context/langContext';
import ToggleStyle from './ToggleStyle';
import { ThemeContext } from './context/themeContext';

const Navbar = () => {
    const { auth } = useContext(Context)
    const { translations } = useContext(LangContext)
    const { changeTheme } = useContext(ThemeContext)
    const [user] = useAuthState(auth)

    return (
        <AppBar position="static" style={{ backgroundColor: `${changeTheme.background.navbarColor}` }}>
            <Toolbar variant={"dense"}>
                <Grid container
                justify='space-around'
                alignItems='center'>
                    <SelectLanguages />
                    <ToggleStyle />
                        {user ?
                            <Button
                                onClick={() => auth.signOut()}
                                variant={"outlined"}
                                style={{ backgroundColor: `${changeTheme.buttons.bgColor}`, color: `${changeTheme.buttons.txtColor}` }}>{translations.buttons.logOut}</Button>
                            :
                            null
                        }
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
