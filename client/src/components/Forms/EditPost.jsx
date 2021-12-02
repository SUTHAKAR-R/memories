import React, { memo } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Paper, TextField, Typography } from '@material-ui/core'

import useStyles from './styles'
import { editPost } from '../../api'
import { useDispatchContext, useStateContext } from '../../context'

const EditPost = () => {
	console.log('Edit Rendered.')

	const classes = useStyles()
	const { register, handleSubmit } = useForm()
	const { post, editMode, posts } = useStateContext()
	const dispatch = useDispatchContext()

	const onSubmit = async ({ title, body, tags: postTags }) => {
		try {
			const tags = postTags.split(', ')
			const editedPost = await editPost({ id: post._id, title, body, tags })
			dispatch({ type: 'POSTS', payload: [...posts, editedPost] })
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<Paper className={classes.paper}>
			<form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate className={`${classes.root} ${classes.form}`}>
				<Typography variant='h6'>Update memory</Typography>
				<TextField
					variant='outlined'
					label='Title'
					fullWidth
					name='title'
					defaultValue={post.title}
					{...register('title')}
				/>
				<TextField
					variant='outlined'
					label='Content'
					fullWidth
					name='body'
					defaultValue={post.body}
					{...register('body')}
				/>
				<TextField
					label='Tags'
					name='tags'
					variant='outlined'
					fullWidth
					defaultValue={post.tags}
					{...register('tags')}
				/>
				<Button
					type='submit'
					variant='contained'
					color='primary'
					size='large'
					fullWidth
					className={classes.buttonSubmit}
				>
					Update
				</Button>
				{editMode && <Button
					variant='contained'
					color='secondary'
					size='large'
					fullWidth
					onClick={() => dispatch({ type: 'EDIT' })}
				>
					Cancel
				</Button>}
			</form>
		</Paper>
	)
}

export default memo(EditPost)