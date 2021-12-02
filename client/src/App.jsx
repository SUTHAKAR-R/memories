import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Container } from '@material-ui/core'

import FlashMessage from './components/FlashMessage'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/AuthForms/Login'
import Register from './components/AuthForms/Register'
import PostDetails from './components/PostDetails/PostDetails'
import { useStateContext } from './context'

const App = () => {

	const { loggedIn } = useStateContext()

	return (
		<BrowserRouter>
			<Container maxWidth='xl'>
				<Navbar />
				<FlashMessage />
				<Switch>
					<Route exact path='/' component={() => <Redirect to='/posts'/>} />
					<Route path='/posts' component={Home} />
					<Route path='/login'>
						{loggedIn ? <Redirect to='/posts' /> : <Login />}
					</Route>
					<Route path='/register'>
						{loggedIn ? <Redirect to='/posts' /> : <Register />}
					</Route>
					<Route path='post/:id' component={PostDetails} />
				</Switch>
			</Container>
		</BrowserRouter>
	)
}

export default App