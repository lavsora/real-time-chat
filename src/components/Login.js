import React, { useContext } from 'react';
import { Button, Container, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Context } from "../index";
import firebase from "firebase";
import { LangContext } from './context/langContext';


const Login = () => {
    const { auth } = useContext(Context)
    const { translations } = useContext(LangContext)

    const login = async () => {
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
                <Grid style={{ width: 400, background: 'lightgray' }}
                    container
                    alignItems={"center"}
                    direction={"column"}
                >
                    <Box p={5}>
                        <Button onClick={login} variant={"outlined"}>{translations.buttons.logWith}</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
