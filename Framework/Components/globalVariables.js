import { createContext, useState} from "react";

const AppContext = createContext();

function AppProvider({children}){
  const [ email, setEmail ] = useState('');
  const [ userUID, setUserUID] =useState('');
  const [password, setPassword] = useState(undefined);
  const [ userInfo, setUserInfo ] = useState('');
  const [name, setName] = useState(undefined);
  const [preloader, setPreloader] =useState(false);
  

  return(
    <AppContext.Provider value={{ email, setEmail, password, setPassword, preloader, setPreloader, name, setName, userUID, setUserUID, userInfo, setUserInfo}}>
      {children}

    </AppContext.Provider>
  )
}

export { AppContext, AppProvider}