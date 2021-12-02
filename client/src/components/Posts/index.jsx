import React, { useEffect } from 'react'
import { CircularProgress, Grid } from '@material-ui/core'

import Post from '../Post'
import { getPosts } from '../../api'
import useStyles from './styles'
import { useDispatchContext, useStateContext } from '../../context'

const Posts = () => {

	const classes = useStyles()
	const { posts, searchPosts, defaultHome, pagination: { current } } = useStateContext()
	const dispatch = useDispatchContext()
	
	useEffect(async () => {
		const data = await getPosts(current)
		dispatch({ type: 'POSTS', payload: data.results })
	}, [current])

	return (
		<>
			{!posts ? <CircularProgress /> : (defaultHome) ? (
				<Grid container spacing={3} alignItems='stretch' className={classes.container}>
					{posts.map(post => (
						<Grid key={post._id} item xs={12} sm={12} md={6} lg={3} >
							<Post post={post} />
						</Grid>
					))}
				</Grid>
			) : (
				<Grid container spacing={3} alignItems='stretch' className={classes.container}>
					{searchPosts.map(post => (
						<Grid key={post._id} item xs={12} sm={12} md={6} lg={3} >
							<Post post={post} />
						</Grid>
					))}
				</Grid>
			)}
		</>
	)
}

export default Posts