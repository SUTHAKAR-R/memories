import React, { memo } from 'react'	
import { Link } from 'react-router-dom'
import {  Typography, AppBar, Toolbar, Button, Avatar } from '@material-ui/core'

import useStyles from './styles'
import { useDispatchContext, useStateContext } from '../../context'
import logo from '../../images/memoriesLogo.png'
import text from '../../images/memoriesText.png'

const Navbar = () => {

	const classes = useStyles()
	const { loggedIn, user } = useStateContext()
	const dispatch = useDispatchContext()

	return (
		<AppBar position='static' color='inherit' className={classes.appBar}>
			<div className={classes.brandContainer}>
				<Link to='/posts'>
					<img src={text} alt='icon' height='35px' />
					<img src={logo} alt='icon' height='30px'className={classes.image} />
				</Link>
			</div>
			<Toolbar className={classes.toolbar}>
				{loggedIn ? (
					<div className={classes.profile}>
						<Avatar className={classes.purple} src={user.avatar} alt={user.username}>{user.username.charAt(0)}</Avatar>
						<Typography variant='h6' className={classes.userName}>{user.username}</Typography>
						<Button 
							className={classes.logout}
							variant='contained' 
							color='secondary' 
							onClick={() => dispatch({ type: 'LOGOUT' })}
							>
							Logout
						</Button>
					</div>
				) : (
						<Button
							component={Link}
							to='/login'
							variant='contained'
							color='primary'
							onClick={() => { }}
						>
							Sign In
						</Button>
				)}
			</Toolbar>
		</AppBar>
	)
}

export default memo(Navbar)