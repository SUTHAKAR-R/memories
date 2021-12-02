import jwt from 'jsonwebtoken'

export const verify = (req, res, next) => {
	try {
		const headers = req.headers.token
		if (headers) {
			const token = headers.split(' ')[1]
			let decodedData
			if (token && token.lenght < 500) {
				decodedData = jwt.verify(token, process.env.JWT_SECRET)
				if (decodedData) {
					req.username = decodedData?.username
				} else {
					res.status(401).json('Auth header is malformed.')
				}
			} else {
				decodedData = jwt.decode(token)
				req.googleUser = decodedData
			}
			next()
		} else {
			res.status(401).json('Auth header is not provided.')
		}
	} catch (e) {
		res.status(500).json(e)
	}
}

export const paginator = model =>  async (req, res, next) => {
		const page = Number(req.query.page)
		const limit = Number(req.query.limit)
		const startIndex = (page - 1) * limit
		const endIndex = page * limit
		const results = {}
		if (endIndex < await model.countDocuments()) {
			results.next = page + 1
		}
		if (startIndex > 0) {
			results.previous = page - 1
		}
		try {
			results.current = page
			results.results = await model.find().limit(limit).skip(startIndex)
			res.paginatedResults = results
			next()
		} catch (e) {
			res.status(500).json({ message: e.message })
		}
	}
