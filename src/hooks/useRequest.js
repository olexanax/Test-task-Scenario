import axios from "axios";
import { useState } from "react";

const useRequest = () => {
    const [isSong, setIsSong] = useState(false);
    const [newData, setNewData] = useState([]);

    const request = search => {
        console.log('request')
        setIsSong(true)
        axios.get(`https://itunes.apple.com/search?term=${search}`)
            .then(data => tranformData(data))
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    const tranformData = data => {
        const albums = new Set(data.data.results.filter(item=>item.kind === 'song').map(item => item.collectionName))
        setNewData([...albums].sort().slice(0,5).map(item => item.length > 15 ? item.slice(0, 30)+'...' : item))
    }

    return{isSong, newData, setNewData, request}
}

export default useRequest