import React, { useContext } from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button, Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";
import SelectLanguages from './SelectLanguages'
import { LangContext } from './context/langContext';

const Navbar = () => {
    const { auth } = useContext(Context)
    const { translations } = useContext(LangContext)
    const [user] = useAuthState(auth)

    return (
        <AppBar color={"secondary"} position="static">
            <Toolbar variant={"dense"}>
                <SelectLanguages />
                <Grid container justify={"flex-end"}>
                    {user ?
                        <NavLink to={LOGIN_ROUTE}>
                            <Button onClick={() => auth.signOut()} variant={"outlined"}>{translations.buttons.logOut}</Button>
                        </NavLink>
                        :
                        null
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
