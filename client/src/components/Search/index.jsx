import React, { useState, memo } from 'react'
import { AppBar, Button, TextField } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'

import useStyles from './styles'
import { searchPosts } from '../../api'
import { useDispatchContext } from '../../context'

const Search = () => {

	const classes = useStyles()
	const [searchTerm, setSearchTerm] = useState('')
	const [tags, setTags] = useState([])
	const dispatch = useDispatchContext()

	const handleSearch = async () => {
		try {
			const searchResults = await searchPosts({ searchTerm, tags })
			console.log(searchResults)
			dispatch({ type: 'SEARCH_POSTS', payload: { defaultHome: false, searchResults } })
		} catch (e) {
			console.log(e)
		}
	}

	const handleClear = () => {
		setSearchTerm('')
		setTags([])
		dispatch({ type: 'SEARCH_POSTS', payload: { defaultHome: true } })
	}

	return (
		<AppBar position='static' color='inherit' className={classes.appBarSearch}>
			<TextField
				label='Search'
				name='search'
				fullWidth
				variant='outlined'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
			/>
			<ChipInput
				label='Tags'
				variant='outlined'
				style={{ margin: '10px 0' }}
				onAdd={tag => setTags([...tags, tag])}
				value={tags}
				onDelete={tagTodelete => setTags(tags.filter(tag => tag !== tagTodelete))}
			/>
			<Button 
				onClick={handleSearch} 
				className={classes.searchButton} 
				variant='contained' 
				color='primary'
			>
				Search
			</Button>
			{searchTerm && (
				<Button
					onClick={handleClear}
					className={classes.searchButton}
					variant='contained'
					color='secondary'
				>
					Clear
				</Button>
			)}
		</AppBar>
	)
}

export default memo(Search)