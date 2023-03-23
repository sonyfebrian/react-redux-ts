import { createContext,useContext,useEffect,useState } from "react";
import { BrowserUtility } from "./browser.utility";

interface AppContextInterface {
    user:any;
    login:(user: any)=>void;
    logout:()=>void
}

export const StorageKeys={
    user:"user"
}
const AuthContext =  createContext<AppContextInterface|null>(null);

type Props = {
    children: JSX.Element,
  };

export const AuthProvider=({children}:Props)=>{

    const [user,setUser] = useState(null);

    useEffect(() => {
        const browserData = BrowserUtility.getObj(StorageKeys.user);
        login(browserData)
    },[]);

    const login = (user:any) => {
        setUser(user);
    }

    const logout = () => {
        setUser(null);
        BrowserUtility.clearKey(StorageKeys.user);
    }

    const applicationContext:AppContextInterface={
        user:user,
        login:login,
        logout:logout
    }   
    
    return (
        <>
            <AuthContext.Provider value={applicationContext}>
                {children}
            </AuthContext.Provider>
        </>
    )

}

export const AuthConsumer = () => useContext(AuthContext);