import { createContext, useState } from "react";
import { theme as rootTheme} from '../../utils/styles';


export const ThemeContext = createContext({
  setThemeContext: (style) => null,
  changeTheme: {}
});

const ThemeContextWrapper = ({children}) => {
const [themeState, setThemeState] = useState('light');

  return (
    <ThemeContext.Provider value={{
        changeTheme: rootTheme[themeState],
        setThemeContext: setThemeState,
        themeState, 
        }}>{children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextWrapper;