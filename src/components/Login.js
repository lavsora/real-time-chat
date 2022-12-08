import { useContext, useState } from 'react';
import { Button, Container, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { AuthContext } from "../index";
import Loader from "./Loader";
import firebase from 'firebase/compat/app';
import { LangContext } from './context/langContext';
import { ThemeContext } from './context/themeContext';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { auth } = useContext(AuthContext)
    const { translations } = useContext(LangContext)
    const { changeTheme } = useContext(ThemeContext)
    const [signInWithEmailAndPassword, loading] = useSignInWithEmailAndPassword(auth);

    const loginWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        // eslint-disable-next-line
        const { user } = await auth.signInWithPopup(provider)
    }

    const loginWithEmailAndPassword = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(email, password)
    }

    if (loading) return <Loader />

    return (
        <Container>
            <Grid container
                style={{ height: '80vh' }}
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
                            onSubmit={loginWithEmailAndPassword}>
                            <input
                                type='text'
                                name='login'
                                value={email}
                                placeholder={translations.inputs.placeholderLog}
                                style={{ color: `${changeTheme.chat.chatTxtColor}`, backgroundColor: `${changeTheme.chat.chatBgColor}` }}
                                onChange={(e) => setEmail(e.target.value)} />
                            <input
                                type='password'
                                name='password'
                                value={password}
                                placeholder={translations.inputs.placeholderPass}
                                style={{ color: `${changeTheme.chat.chatTxtColor}`, backgroundColor: `${changeTheme.chat.chatBgColor}` }}
                                onChange={(e) => setPassword(e.target.value)} />
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
