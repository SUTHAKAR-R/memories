import React from 'react'
import { Link } from 'react-router-dom'
import { Paper } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import PaginationItem from '@material-ui/lab/PaginationItem'

import useStyles from './styles'
import { useStateContext } from '../../context'

const Paginate = () => {

	const classes = useStyles()
	const { pagination: { current } } = useStateContext()

	return (
		<Paper elevation={6} className={classes.pagination}>
			<Pagination 
				classes={{ ul: classes.ul }}
				count={2} 
				page={current}
				variant='outlined' 
				color='primary'
				renderItem={item => <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>} 
			/>
		</Paper>
	)
}

export default Paginate