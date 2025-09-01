import { useTheme } from "next-themes";

export  const useCurrentTheme = ()=>{
    const { theme, systemTheme} = useTheme();

    if(theme === "dark" || theme === "Light"){
        return theme;
    }

    return systemTheme;
}