import React, {useCallback, useState} from 'react';

import {AppContextData, AppData, AppDataHandler} from '../../types';

export const AppContext = React.createContext<AppContextData>({
    data: {
        reviews: []
    },
    setData: () => {
        return;
    }
});

interface AppContextProviderProps {
    children: React.ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({children}) => {
    const [data, setData] = useState<AppData>({
        reviews: []
    });

    const handleSetData: AppDataHandler = useCallback(data => {
        setData(prevState => ({
            ...prevState,
            ...data
        }));
    }, []);

    const contextValue = {data, setData: handleSetData};

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
