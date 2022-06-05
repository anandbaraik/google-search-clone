import React, {createContext, useContext, useState} from "react";
const baseUrl = "https://google-search3.p.rapidapi.com/api/v1";
const ResultContext = createContext();

export const ResultContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("Elon musk");
    const [results, setResults] = useState([]);

    const getResults = async (type) => {
        setIsLoading(true);
        const response = await fetch(`${baseUrl}${type}`, {
            method: 'GET',
            headers: {
                'X-User-Agent': 'desktop',
                'X-Proxy-Location': 'EU',
                'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
                'X-RapidAPI-Key': '908a8dad21msh4993bfd0b52a471p17bcd5jsn9b7ffaf5e7a2'
            }
        });

        const data = await response.json();
        
        if(type.includes("/news")){
            setResults(data.entries);
        } else if(type.includes("/image")) {
            setResults(data.image_results);
        } else {
            setResults(data.results);
        }

        setIsLoading(false);
    }

    return (
        <ResultContext.Provider value={{getResults, results, searchTerm, setSearchTerm, isLoading}}>
            {children}
        </ResultContext.Provider>
    );
}

export const useResultContext = () => useContext(ResultContext);