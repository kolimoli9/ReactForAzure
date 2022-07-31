import React from 'react'
import './NoPage.css'
const NoPage = () => {
  console.log(window.location.href)
  return (
      <div className='NoPage'>

<div className='NoPagediv'>

<h1 className='NoPageh1'>4 0 4</h1>


<svg>
  <defs>
    <filter id="glow">
      <fegaussianblur className="blur" result="coloredBlur" stdDeviation="4"></fegaussianblur>
      <femerge>
        <femergenode in="coloredBlur"></femergenode>
        <femergenode in="SourceGraphic"></femergenode>
      </femerge>
    </filter>
  </defs>
</svg>

 <a href='/'><h2 className='NoPageh2'>Page Not Found</h2></a>
      </div>
      </div>
        )
}

export default NoPage