import {useState, useEffect} from 'react'
import { createContext, useContext } from 'react'

const AppContext = createContext(null);
export const useAppContext = () => {
    const context = useContext(AppContext);

    if(context === undefined){
        throw new Error("Appcontext must be within appContextProvider");
    }

    return context;
};

const AppContextProvider = ({children}) =>{

    const [favourites, setFavourites] = useState([]);
    const [addTime, setAddTime] = useState([]);
    
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
        if (storedFavorites) {
            setFavourites(storedFavorites);
        }
      }, []);
    
      useEffect(() => {
        const storedAddTime = JSON.parse(localStorage.getItem('addTime'));
        if (storedAddTime) {
            setAddTime(storedAddTime);
        }
      }, []);
      
    const addToFavourites = (uni) => {
        const clickedTime = new Date().toString();
       
        const newFavourite = [...favourites, {...uni, clickedTime}];
        const newAddTime = [...addTime, {uniName: uni, time: clickedTime}];
        setAddTime(newAddTime);
        localStorage.setItem('addTime', JSON.stringify(newAddTime));
        setFavourites(newFavourite);
        localStorage.setItem('favorites', JSON.stringify(newFavourite));
    };

    const removeFromFavourites = (name) =>{
        const updatedFavorites = [...favourites].filter((uni)=>uni.name!== name);
        setFavourites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        const updatedAddTime = [...addTime].filter((uni)=>uni.uniName.name!==name);
        setAddTime(updatedAddTime);
        localStorage.setItem('addTime', JSON.stringify(updatedAddTime));
    };

    return(
      <AppContext.Provider
      value = {{favourites, addToFavourites, removeFromFavourites}}
      >
        {children}
      </AppContext.Provider>
    );
};

export default AppContextProvider;