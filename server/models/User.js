import mongoose from 'mongoose'

const { model, Schema } = mongoose

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	}
}, { timestamps: true })

const User = model('User', UserSchema)

export default User