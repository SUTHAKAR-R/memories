import React from 'react'

import { useStateContext } from '../../context'
import './flashMessage.css'

const FlashMessage = () => {

	const { flashMessages } = useStateContext()

	return (
		<div className='floating-alerts'> 
			{
				flashMessages.map((msg, i) => (
					<div key={i} className={`alert alert-${msg.mood} text-center floating-alert shadow-sm`}>
						{msg.content}
					</div>
				))
			}
		</div>
	)
}

export default FlashMessage