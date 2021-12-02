import mongoose from 'mongoose'
import Post from '../models/Post'

export const getPosts = async (req, res) => {
	try {
		res.status(200).json(res.paginatedResults)
	} catch (e) {
		res.status(500).json({ message: e.message })
	}
}

export const createPost = async (req, res) => {
	try {
		const post = await Post.create(req.body)
		res.status(201).json(post)
	} catch (e) {
		res.status(500).json({ message: e.message })
	}
}

export const updatePost = async (req, res) => {
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json('Post does not exist to update.')
	try {
		const post = await Post.findByIdAndUpdate(id, { $set: req.body }, { new: true })
		res.status(200).json(post)
	} catch (e) {
		res.status(500).json({ message: e.message })
	}
}

export const deletePost = async (req, res) => {
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json('Post does not exist to delete.')
	try {
		await Post.findByIdAndDelete(id)
		res.status(200).json('Post has been deleted.')
	} catch (e) {
		res.status(500).json({ message: e.message })
	}
}

export const likePost = async (req, res) => {
	const { id } = req.params
	const { userId } = req.body
	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json('Post does not exist to like.')
	try {
		const post = await Post.findById(id)
		if (!post.likes.includes(userId)) {
			await post.updateOne({ $push: { likes: userId } })
			res.status(200).json('Liked the post.')
		} else {
			await post.updateOne({ $pull: { likes: userId } })
			res.status(200).json('Unliked the post.')
		}
	} catch (e) {
		res.status(500).json({ message: e.message })
	}
}

export const searchPosts = async (req, res) => {
	const { searchTerm } = req.body
	try {
		const title = new RegExp(searchTerm, 'i')
		const posts = await Post.find({ $or: [ { title }, { tags: { $in: req.body.tags } } ] })
		res.status(200).json(posts)
	} catch (e) {
		console.log(e)
	}
}