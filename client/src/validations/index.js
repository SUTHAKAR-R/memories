import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const RegisterValidationSchema = yup.object().shape({
	username: yup.string().min(8).required('Username is required.'),
	email: yup.string().email().required('Email is required.'),
	password: yup.string().min(8).required('Password is requried.'),
	confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match.'),
	avatar: yup.string()
})

const LoginValidationSchema = yup.object().shape({
	username: yup.string().required('Username is required.'),
	password: yup.string().required('Password is requried.')
})

const PostValidationSchema = yup.object().shape({
	title: yup.string().required('Post needs a title.'),
	body: yup.string().required('Post needs a body.'),
})

export const resgisterOptions = {
	resolver: yupResolver(RegisterValidationSchema)
}

export const loginOptions = {
	resolver: yupResolver(LoginValidationSchema)
}

export const postOptions = {
	resolver: yupResolver(PostValidationSchema)
}