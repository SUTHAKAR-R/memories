import React, { memo, useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Paper, TextField, Typography } from '@material-ui/core'

import useStyles from './styles'
import { createPost } from '../../api'
import { useDispatchContext, useStateContext } from '../../context'
import { postOptions } from '../../validations'

const CreatePost = () => {
		
	const classes = useStyles()
	const { posts, loggedIn, user: { userId } } = useStateContext()
	const dispatch = useDispatchContext()
	const { register, handleSubmit, reset, formState: { isDirty, errors } } = useForm(postOptions)

	const onSubmit = async({ title, body, cover, tags: postTags }) => {
		if (!loggedIn) {
			dispatch({ type: 'FLASH_MESSAGE', payload: { content: 'You need to be logged in to share your memory.', mood: 'danger' } })
			return 
		}
		try {
			const tags = postTags.split(', ')
			const post = await createPost({ userId, title, body, cover, tags })
			dispatch({ type: 'POSTS', payload: [...posts, post] })
			reset()
		} catch (e) {
			console.log(e)
		}	
	}

	return (
		<Paper className={classes.paper}>
			<form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate className={`${classes.root} ${classes.form}`}>
				<Typography variant='h6'>Share a memory</Typography>
				<TextField 
					label='Title' 
					name='title' 
					variant='outlined' 
					fullWidth 
					{...register('title')} 
					error={!!errors.title}
					helperText={errors?.title?.message}
				/>
				<TextField 
					label='Content' 
					name='body' 
					variant='outlined' 
					fullWidth 
					{...register('body')}
					error={!!errors.body}
					helperText={errors?.body?.message}
				/>
				<TextField 
					label='Tags' 
					name='tags' 
					variant='outlined' 
					fullWidth 
					{...register('tags')}
					error={!!errors.tags}
					helperText={errors?.tags?.message}
				/>
				<TextField 
					label='Cover' 
					variant='outlined' 
					name='cover' 
					fullWidth 
					{...register('cover')}
				/>
				<Button 
					type='submit' 
					variant='contained' 
					color='primary' 
					size='large' 
					fullWidth 
					className={classes.buttonSubmit}
				>
					Share
				</Button> 
				{isDirty && <Button 
					variant='contained' 
					color='secondary' 
					size='large' 
					fullWidth 
					onClick={() => reset()}
				>
					Cancel
				</Button>}
			</form>
		</Paper>
	)
}

export default memo(CreatePost)