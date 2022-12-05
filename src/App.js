import { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Navbar from "./components/Navbar";
import AppRouter from "./components/AppRouter";
import './App.css'
import { Context } from "./index";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "./components/Loader";
import LangContextWrapper from './components/context/langContext';
import { ThemeContext } from './components/context/themeContext';


const App = () => {
    const { auth } = useContext(Context)
    // eslint-disable-next-line
    const [user, loading, error] = useAuthState(auth)
    const { changeTheme } = useContext(ThemeContext)

    useEffect(() => {
        document.body.style.backgroundColor = `${changeTheme.background.mainBgColor}`
    }, [changeTheme])

    if (loading) return <Loader />


    return (
        <LangContextWrapper>
            <BrowserRouter>
                <Navbar />
                <AppRouter />
            </BrowserRouter>
        </LangContextWrapper>
    );
};

export default App;
