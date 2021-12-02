import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Avatar, Container, Paper, Typography, Grid, TextField, Button, InputAdornment, IconButton } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useForm } from 'react-hook-form'
import GoogleLogin from 'react-google-login'

import Icon from './Icon'
import useStyles from './styles'
import { createUser } from '../../api'
import { useDispatchContext } from '../../context'
import { resgisterOptions } from '../../validations'

const Register = () => {

	const classes = useStyles()
	const [visibility, setVisibility] = useState(false)
	const { register, handleSubmit, formState: { errors } } = useForm(resgisterOptions)
	const history = useHistory()
	const dispatch = useDispatchContext()

	const onSubmit = async ({ username, email, password, avatar }) => {
		try {
			await createUser({ username, email, password, avatar })
			history.push('/login')
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

	const googleFailure = e => console.log(e)

	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant='h5'>Sign Up</Typography>
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
								label='Email'
								name='email'
								variant='outlined'
								fullWidth
								{...register('email')}
								error={errors?.email}
								helperText={errors?.email?.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label='Avatar'
								name='avatar'
								variant='outlined'
								fullWidth
								{...register('avatar')}
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
						<Grid item xs={12}>
							<TextField
								label='Confirm Password'
								name='confirmPassword'
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
								{...register('confirmPassword')}
								error={errors?.confirmPassword}
								helperText={errors?.confirmPassword?.message}
							/>
						</Grid>
						<Button type='submit' variant='contained' color='primary' size='large' fullWidth className={classes.submit}>Sign Up</Button>
						<GoogleLogin
							clientId='696431949995-9q7urkd4qteid722qbgb6c5v0412r886.apps.googleusercontent.com'
							render={renderProps => (
								<Button className={classes.googleButton} variant='contained' fullWidth color='primary' onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />}>
									Google Sign In
								</Button>
							)}
							onSuccess={googleSuccess}
							onFailure={googleFailure}
							cookiePolicy='single_host_origin'
						/>
					</Grid>
				</form>
				<span>Already have an account? <Link to='/login' style={{ textDecoration: 'none' }}>login!</Link></span>
			</Paper>
		</Container>
	)
}

export default Register