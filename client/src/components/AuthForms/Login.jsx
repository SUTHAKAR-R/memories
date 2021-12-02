import React, { useState } from 'react'
import { Avatar, Container, Paper, Typography, Grid, TextField, Button, InputAdornment, IconButton } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useForm } from 'react-hook-form'
import GoogleLogin from 'react-google-login'
import { Link } from 'react-router-dom'

import Icon from './Icon'
import useStyles from './styles'
import { useDispatchContext } from '../../context'
import { loginUser } from '../../api'
import { loginOptions } from '../../validations'

const Login = () => {

	const classes = useStyles()
	const [visibility, setVisibility] = useState(false)
	const { register, handleSubmit, formState: { errors }, setError } = useForm(loginOptions)
	const dispatch = useDispatchContext()

	const onSubmit = async ({ username, password }) => {
		try {
			const user = await loginUser({ username, password })
			if (user === 'Invalid username.') {
				setError('username', { type: 'string', message: user })
				return 
			} else if (user === 'Invalid password.') {
				setError('password', { type: 'string', message: user })
				return
			} else {
				dispatch({ type: 'LOGIN', payload: { username: user.username, avatar: user.avatar, token: user.token, userId: user._id } })
			}
		} catch (e) {
			console.log(e)
		}
	}

	const googleSuccess = async res => {
		const profileObj = res?.profileObj
		const tokenId = res?.tokenId
		try {
			dispatch({ type: 'LOGIN', payload: { username: profileObj.name, avatar: profileObj.imageUrl, token: tokenId } })
		} catch (e) {
			console.log(e)
		}
	}

	const googleFailure = (e) => console.log(e)

	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar> 
				<Typography variant='h5'>Login</Typography>
				<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<TextField 
								label='Username' 
								name='username' 
								variant='outlined' 
								fullWidth 
								{...register('username')}
								error={errors?.username}
								helperText={errors?.username?.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label='Password'
								name='password'
								type={visibility ? 'text' : 'password'}
								variant='outlined'
								fullWidth
								InputProps={{
									endAdornment: <InputAdornment position='end'>
										<IconButton onClick={() => setVisibility(!visibility)}>
											{visibility ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}}
								{...register('password')}
								error={errors?.password}
								helperText={errors?.password?.message}
							/>
						</Grid>
						<Button type='submit' variant='contained' color='primary' size='large' fullWidth className={classes.submit}>Login</Button>
						<GoogleLogin 
							clientId='696431949995-9q7urkd4qteid722qbgb6c5v0412r886.apps.googleusercontent.com'
							render={renderProps => (
								<Button  className={classes.googleButton} variant='contained' fullWidth color='primary' onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />}>
									Google Sign In
								</Button>
							)}
							onSuccess={googleSuccess}
							onFailure={googleFailure}
							cookiePolicy='single_host_origin'
						/>
					</Grid>
				</form>
				<span>Need an account? <Link to='/register' style={{ textDecoration: 'none' }}>signup!</Link></span>
			</Paper>
		</Container>
	)
}

export default Login