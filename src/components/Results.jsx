import React, {useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import {useResultContext} from '../contexts/ResultContextProvider';
import {Loading} from "./Loading";
export const Results = () => {
  const {getResults, results, searchTerm, setSearchTerm, isLoading} = useResultContext();
  const location = useLocation();
  useEffect(() => {
	  if(searchTerm){
		  if(location.pathname === "/videos"){
			  getResults(`/search/q=${searchTerm} videos`);
		  } else {
			let path = (location.pathname === "/images") ? "/image" : location.pathname;
			getResults(`${path}/q=${searchTerm}&num=65`);
		  }
	  }
  }, [searchTerm, location.pathname])

  if(isLoading) return <Loading/>
  
  switch(location.pathname){
		case '/search':
			return (
				<div className='flex flex-wrap justify-between space-y-6 sm:px-56'>
					{
						results?.map(({link, title, description}, index) => (
							<div key={index} className='mt-5 md:w-2/5 w-full'>
								<a href={link ? link : ''} target="_blank" rel='noreferrer'>
									<p className='text-sm'>
										{(link.length > 30) ? `${link.substring(0, 30)}...` : link}
									</p>
									<p className='text-lg hover:underline dark:text-blue-300 text-blue-700 break-words'>
										{title ? title : ''}
									</p>
									<p className='text-sm break-words'>
										{description ? `${description.substring(0, 85)}...` : ''}
									</p>
								</a>
							</div>
						))
					}
				</div>
			);
		case '/news':
			return (
				<div className='flex flex-wrap justify-between space-y-6 sm:px-56 items-center'>
					{
						results?.map(({links, source, title}, index) => (
							<div key={index} className='mt-5 md:w-2/5 w-full'>
								<a href={links?.[0].href} target="_blank" rel='noreferrer'
									className='hover:underline'>
									<p className='text-lg dark:text-blue-300 text-blue-700 break-words'>
										{title ? title : ''}
									</p>
									<div className='flex gap-4'>
										<a href={source?.href}
											target="_blank"
											rel='noreferrer'
											className='text-sm break-words'>
											{source?.href}
										</a>
									</div>
								</a>
							</div>
						))
					}
				</div>
			);
		case '/videos':
			return (
				<div className='flex flex-wrap justify-center items-center'>
					{
						results.map((video, index) => (
							<div key={index} className="p-2">
								{
									video?.additional_links?.[0].href &&
									(
										<ReactPlayer
											url={video?.additional_links?.[0].href}
											controls
											width="355px"
											height="200px"
										/>
									)
								}
							</div>
						))
					}
				</div>
			);
		case '/images':
			return (
				<div className='flex flex-wrap justify-center items-center rounded'>
					{
						results?.map(({image, link:{href, title}}, index) => (
							<a key={index} href={href ? href : ''} target="_blank" rel="noreferrer"
								className='sm:p-3 p-5'>
								<img src={image?.src} alt={title ? title : ''} loading="lazy" className='rounded'/>
								<p className='w-36 break-words text-sm mt-2'>
									{(title.length > 30) ? `${title.substring(0, 30)}...` : title}
								</p>
							</a>
						))
					}
				</div>
			);
		default:
			return "error";
  }
}