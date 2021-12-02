import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User'

export const createUser = async (req, res) => {
	const { username, email, password, avatar } = req.body
	try {
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)
		const _user = new User({
			username,
			email,
			avatar,
			password: hashedPassword
		})
		const user = await _user.save()
		const { password: nope, ...info } = user._doc
		res.status(201).json(info)
	} catch (e) {
		res.status(500).json(e)
	}
}

export const deleteUser = async (req, res) => {
	try {
		if (req.params.username === req.username) {
			const user = await User.findOne({ username: req.username })
			if (!user) return res.status(404).json('User does not exist.')
			await user.deleteOne()
			return res.status(200).json('User has been deleted.')
		} else {
			return res.status(401).json('You can delete only your account.')
		}
	} catch (e) {
		res.status(500).json(e)
	}
}

export const loginUser = async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username })
		if (!user) return res.status(404).json('Invalid username.')
		const isValid = await bcrypt.compare(req.body.password, user.password)
		if (!isValid) return res.status(401).json('Invalid password.')
		const token = jwt.sign(
			{ username: req.body.username },
			process.env.JWT_SECRET,
			{ expiresIn: '1d'}
		)
		const { _id, username, avatar } = user._doc
		res.status(200).json({
			_id,
			username,
			avatar,
			token
		})
	} catch (e) {
		console.log(e)
		res.status(500).json(e)
	}
}