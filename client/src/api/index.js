const token = localStorage.getItem('token')

export const getPosts = async page => {
	try {
		const response = await fetch(`http://localhost:5000/post?page=${page}&limit=2`)
		const posts = await response.json()
		return posts
	} catch (e) {
		console.log(e)
	}
}

export const createPost = async ({ userId, title, body, cover, tags }) => {
	console.log(tags)
	try {
		const response = await fetch('http://localhost:5000/post/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'token': `Bearer ${token}`
			},
			body: JSON.stringify({ userId, title, body, cover, tags })
		})
		const post = await response.json()
		return post
	} catch (e) {
		console.log(e)
	}
}

export const editPost = async ({ id, title, body, tags }) => {
	try {
		const response = await fetch(`http://localhost:5000/post/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'token': `Bearer ${token}`
			},
			body: JSON.stringify({ title, body, tags })
		})
		const post = await response.json()
		return post
	} catch (e) {
		console.log(e)
	}
}

export const deletePost = async ({ id }) => {
	try {
		const response = await fetch(`http://localhost:5000/post/${id}`, {
			method: 'DELETE',
			headers: {
				'token': `Bearer ${token}`
			}
		})
		const data = await response.json()
		return data
	} catch (e) {
		console.log(e)
	}
}

export const likePost = async ({ id, userId }) => {
	try {
		await fetch(`http://localhost:5000/post/${id}/like`, {
			method: 'PATCH',
			headers: {
				'token': `Bearer ${token}`
			},
			body: JSON.stringify({ userId })
		})
	} catch (e) {
		console.log(e)
	}
}

export const createUser = async ({ username, email, password, avatar }) => {
	try {
		const response = await fetch('http://localhost:5000/user/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, email, password, avatar })
		})
		const user = await response.json()
		return user
	} catch (e) {
		console.log(e)
	}
}

export const loginUser = async ({ username, password }) => {
	try {
		const response = await fetch('http://localhost:5000/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		})
		const user = await response.json()
		if (user === 'Invalid username.') {
			return 'Invalid username.'
		} else if (user === 'Invalid password.') {
			return 'Invalid password.'
		}
		else return user
	} catch (e) {
		console.log(e)
	}
}

export const searchPosts = async ({ searchTerm, tags }) => {
	try {
		const response = await fetch('http://localhost:5000/post/search', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ searchTerm, tags })
		})
		const data = await response.json()
		return data
	} catch (e) {
		console.log(e)
	}
}