import mongoose from 'mongoose'

const { model, Schema } = mongoose

const PostSchema = new Schema({
	userId: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	cover: {
		type: String
	},
	likes: {
		type: Array
	},
	tags: {
		type: Array
	},
}, { timestamps: true })

const Post = model('Post', PostSchema)

export default Post