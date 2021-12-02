import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Card, CardActions, CardContent, CardMedia, Typography, ButtonBase } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import moment from 'moment'

import { useDispatchContext, useStateContext } from '../../context'
import { deletePost, likePost } from '../../api'
import useStyles from './styles'

const Post = ({ post }) => {

	const classes = useStyles()
	const { user: { userId }, posts, loggedIn } = useStateContext()
	const dispatch = useDispatchContext()
	const [likes, setLikes] = useState(post.likes.length)
	const [liked, setLiked] = useState(Boolean(post.likes.includes(userId)))
	const history = useHistory()

	const handleDelete = async () => {
		if (!loggedIn) {
			dispatch({ type: 'FLASH_MESSAGE', payload: { content: 'You need to be logged in to delete the post.', mood: 'danger' } })
			return
		}
		try {
			const data = await deletePost({ id: post._id })
			dispatch({ type: 'FLASH_MESSAGE', payload: { content: data, mood: 'success' } })
			dispatch({ type: 'POSTS', payload: posts.filter(singlePost => singlePost._id !== post._id) })
		} catch (e) {
			console.log(e)
		}
	}

	const handleLike = async () => {
		if (!loggedIn) {
			dispatch({ type: 'FLASH_MESSAGE', payload: { content: 'You need to be logged in to like post.', mood: 'danger' } })
			return
		}
		try {
			await likePost({ id: post._id, userId })
		} catch (e) {
			console.log(e)
		}
		setLikes(liked ? likes - 1 : likes + 1)
		setLiked(!liked)
	}

	const openPost = () => {
		history.push(`/post/${post._id}`)
	}

	return (
		<Card className={classes.card} raised elevation={6}>
			<ButtonBase className={classes.cardAction} onClick={openPost} component='span'>
				<CardMedia className={classes.media} image={post.cover} title={post.title} />
				<div className={classes.overlay}>
					<Typography variant='h6'>Suthakar</Typography>
					<Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
				</div>
				<div className={classes.overlay2}>
					{userId === post.userId && (
						<Button 
							size='small' 
							style={{ color: 'white' }} 
							onClick={e => {
								e.stopPropagation()
								dispatch({ type: 'EDIT', payload: post })
							}}
						>
							<MoreHorizIcon fontSize='small' />
						</Button>
					)}
				</div>
				<div className={classes.details}>
					<Typography variant='body2' color='textSecondary'>{post?.tags?.map(tag => `#${tag} `)}</Typography>
				</div>
				<Typography className={classes.title} variant='h6' gutterBottom>{post.title}</Typography>
				<CardContent>
					<Typography variant='body2' color='textSecondary' component='p'>{post.body}</Typography>
				</CardContent> 
			</ButtonBase>
			<CardActions className={classes.cardActions}>
				<Button size='small' color='primary' onClick={handleLike}>
					{liked ? <ThumbUpAltIcon fontSize='small' /> : <ThumbUpAltOutlined fontSize='small' />}
					{likes.length > 1 ? 'Likes' : 'Like'}
					{likes}
				</Button>
				{userId === post.userId && (
					<Button size='small' color='secondary' onClick={handleDelete}>
						<DeleteIcon fontSize='small' />
						Delete
					</Button>
				)}
			</CardActions>
		</Card>
	)
}

export default Post