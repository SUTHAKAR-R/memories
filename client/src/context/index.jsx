import React, { createContext, useContext, useEffect, useMemo } from 'react'
import { useImmerReducer } from 'use-immer'

const StateContext = createContext()
const DispatchContext = createContext()

const initialState = {
	loggedIn: Boolean(localStorage.getItem('token')),
	user: {
		userId: localStorage.getItem('userId'),
		token: localStorage.getItem('token'),
		username: localStorage.getItem('username'),
		avatar: localStorage.getItem('avatar')
	},
	editMode: false,
	post: {},	
	posts: [],
	searchPosts: [],
	defaultHome: true,
	pagination: {
		previous: 0,
		current: 1,
		next: 0,
	},
	flashMessages: []
}

const reducer = (draft, { type, payload }) => {
	switch (type) {
		case 'POSTS':
			draft.posts = payload
			break

		case 'PAGE':
			draft.pagination.current = payload
			break

		case 'SEARCH_POSTS':
			draft.defaultHome = payload.defaultHome
			draft.searchPosts = payload.searchResults
			break

		case 'EDIT':
			draft.editMode = !draft.editMode
			draft.post = payload
			break

		case 'LOGIN':
			draft.loggedIn = true
			draft.user = payload
			break

		case 'LOGOUT':
			draft.loggedIn = false
			break

		case 'FLASH_MESSAGE': 
			draft.flashMessages.push(payload)
			
		default:
			break
	}
}

export const ContextProvider = ({ children }) => {

	const [state, dispatch] = useImmerReducer(reducer, initialState)

	useEffect(() => {
		if (state.loggedIn) {
			localStorage.setItem('token', state.user.token)
			localStorage.setItem('username', state.user.username)
			localStorage.setItem('avatar', state.user.avatar)
			localStorage.setItem('userId', state.user.userId)
		} else {
			localStorage.removeItem('token')
			localStorage.removeItem('username')
			localStorage.removeItem('avatar')
			localStorage.removeItem('userId')
		}
	}, [state.loggedIn])

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				{ children }
			</DispatchContext.Provider>
		</StateContext.Provider>
	)
}

export const useStateContext = () => {
	const { 
		post, 
		editMode, 
		posts, 
		loggedIn, 
		user, 
		flashMessages, 
		searchPosts, 
		defaultHome,
		pagination
	} = useContext(StateContext)

	return useMemo(
		() => ({ post, editMode, posts, loggedIn, user, flashMessages, searchPosts, defaultHome, pagination }),
		[post, editMode, posts, loggedIn, user, flashMessages, searchPosts, defaultHome, pagination]
	)
}

export const useDispatchContext = () => useContext(DispatchContext)