import React from 'react'
import { Logo } from './Logo'
import { HomeBtn } from './HomeBtn'
import LayerScreen from './LayerScreen'
import ChatBox from './ChatBox'

export const MainScreen = () => {
  return (
		<div className='flex flex-col justify-between  mainScreen'>
			<div className='flex justify-around'>
				<div><Logo text={"AI DOC"}/></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div><HomeBtn/></div>
			</div>
			<LayerScreen/>
		</div>
		
  )
}
