import { useState, useEffect, useRef} from 'react';
import { Input } from 'antd';
import useRequest from './hooks/useRequest';
import './App.css';

function App() {
    const [data, setData] = useState(["a","b","c","d","e"])
    const [search, setSearch] = useState('')
    const prevSearchRef = useRef()

    const {isSong, newData, setNewData, request} = useRequest()

    useEffect(()=>{
        setTimeout(transformList, 1000)

        return ()=>clearTimeout(transformList, 1000)
    }, [data])

    const transformList = () => {
        if(!isSong){
            setData(prev => [prev[prev.length-1], ...prev.slice(0,prev.length-1)]);
        } else{
            setData(prev => [...prev.slice(1,prev.length), prev[0]])
            if(newData.length){
                 setData(prev=> [...prev.slice(0,prev.length-1), newData[0]])
                 setNewData((prev)=>prev.slice(1, prev.length))
            }
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(search !== prevSearchRef.current){
            request(search)
            prevSearchRef.current = search
        }
    }
    const onChange = e => {
        setSearch(prev => e.target.value)
    }

    const renderItems = data => {
        const list = data.map((item,i) => <p key={i}>{item}</p>) 
        return (
            <div className='listConteiner'>
                {list}
            </div>
            )
    }

  return (
    <div className="App">
        <form onSubmit={e=>onSubmit(e)}>
            <Input value={search} 
                onChange={e=>onChange(e)} 
                type="click" 
                placeholder='Search...'/>
        </form>
        {renderItems(data)}
    </div>
  );
}

export default App;
