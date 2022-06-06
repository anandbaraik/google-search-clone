import React,{useEffect, useState} from 'react';
import { useDebounce } from 'use-debounce';
import { useResultContext } from '../contexts/ResultContextProvider';
import {Links} from "../components/Links";
export const Search = () => {
  const [text, setText] = useState("javascript");
  const {setSearchTerm} = useResultContext();
  const [debouncedValue] = useDebounce(text, 300);

  useEffect(() => {
    if(debouncedValue) setSearchTerm(debouncedValue);
  }, [debouncedValue]);

  return (
    <div 
		className='m-auto relative sm:-mt-10 mt-3'>
		<input
			value={text}
			type="search"
			className='sm:w-96 w-80 h-10 dark:bg-gray-200  border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg'
			placeholder='🔎 Search google or type URL'
			onChange={(e) => setText(e.target.value)}
		/>
		{
			text !== '' && (
			<button type="button" className="absolute top-1.5 right-4 text-2xl text-gray-500 " onClick={() => setText('')}>
			x
			</button>)
		}
        <Links/>
    </div>
  )
}
