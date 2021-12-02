import React from 'react'
import { useLocation } from 'react-router-dom'
import { Container, Grid, Grow } from '@material-ui/core'

import Posts from '../Posts'
import Search from '../Search'
import EditPost from '../Forms/EditPost'
import CreatePost from '../Forms/CreatePost'
import Paginate from '../Pagination'
import useStyles from './styles'
import { useDispatchContext, useStateContext } from '../../context'

const Home = () => {

	const classes = useStyles()
	const { editMode } = useStateContext()
	const dispatch = useDispatchContext()

	const { search } = useLocation()
	if (!!search) {
		const query = new URLSearchParams(search)
		dispatch({ type: 'PAGE', payload: Number(query.get('page')) })
	}

	return (
		<Grow in>
			<Container maxWidth='xl'>
				<Grid container spacing={3} justifyContent='space-between' alignItems='stretch' className={classes.gridContainer}>
					<Grid item xs={12} sm={6} md={9}>
						<Posts />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<Search />
						{editMode ? <EditPost /> : <CreatePost />}
						<Paginate />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	)
}

export default Home