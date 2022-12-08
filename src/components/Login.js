import React, { useContext } from 'react';
import { Button, Container, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { AuthContext } from "../index";
import firebase from "firebase";
import { LangContext } from './context/langContext';
import { ThemeContext } from './context/themeContext';


const Login = () => {
    const { auth } = useContext(AuthContext)
    const { translations } = useContext(LangContext)
    const { changeTheme } = useContext(ThemeContext)

    const loginWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        // eslint-disable-next-line
        const { user } = await auth.signInWithPopup(provider)
    }

    return (
        <Container>
            <Grid container
                style={{ height: window.innerHeight - 50 }}
                alignItems={"center"}
                justify={"center"}
            >
                <Grid style={{ width: 400, backgroundColor: `${changeTheme.chat.chatBgColor}` }}
                    container
                    alignItems={"center"}
                    direction={"column"}
                >
                    <Box p={2}>
                        <form
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                            onSubmit={(e) => e.preventDefault()}>
                            <input
                                type='text'
                                name='login'
                                placeholder={translations.inputs.placeholderLog}
                                style={{ color: `${changeTheme.chat.chatTxtColor}`, backgroundColor: `${changeTheme.chat.chatBgColor}` }} />
                            <input
                                type='password'
                                name='password'
                                placeholder={translations.inputs.placeholderPass}
                                style={{ color: `${changeTheme.chat.chatTxtColor}`, backgroundColor: `${changeTheme.chat.chatBgColor}` }} />
                            <Button
                                type='submit'
                                style={{ backgroundColor: `${changeTheme.buttons.bgColor}`, color: `${changeTheme.buttons.txtColor}`, width: 'fit-content' }}
                                variant={"outlined"}>{translations.buttons.logIn}</Button>
                        </form>
                    </Box>
                    <Box p={5}>
                        <Button style={{ backgroundColor: `${changeTheme.buttons.bgColor}`, color: `${changeTheme.buttons.txtColor}` }} onClick={loginWithGoogle} variant={"outlined"}>{translations.buttons.logWith}</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
