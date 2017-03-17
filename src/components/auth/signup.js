import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/index';
import _ from 'lodash';

class Signup extends Component {

	onSubmit({ email, password }) {
		this.props.signupUser({ email, password });
	}

	renderAlert() {
		if (this.props.errorMessage){
			return(
				<div className='alert alert-danger'>
					<strong>{this.props.errorMessage}</strong>
				</div>
			);
		}
	}

	validationMessage(item) {
		return item.touched && item.error && <div className='error'>{item.error}</div>
	}

	render() {
		// possible because of reduxForm
		const { handleSubmit, fields: { email, password, passwordConfirm } } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<fieldset className='form-group'>
					<label>Email:</label>
					<input {...email} className='form-control' />
					{this.validationMessage(email)}
				</fieldset>
				
				<fieldset className='form-group'>
					<label>Password:</label>
					<input {...password} type='password' className='form-control' />
					{this.validationMessage(password)}
				</fieldset>

				<fieldset className='form-group'>
					<label>Confirm Password:</label>
					<input {...passwordConfirm} type='password' className='form-control' />
					{this.validationMessage(passwordConfirm)}
				</fieldset>
				{this.renderAlert()}
				<button action='submit' className='btn btn-primary'>Sign Up</button>
			</form>
		);
	}
}

function validate(formProps) {
	let errors = {};

	const fieldToName = {
		email: 'an email address',
		password: 'a password',
		passwordConfirm: 'a password confirmation'
	}

	_.keys(formProps).forEach(item => {
		if (!item){
			errors[item] = 'Please enter ' + fieldToName[item];
		}
	});

	return errors;
}

function mapStateToProps(state) {
	// RETURN THE OBJECT
	return {
		errorMessage: state.auth.errorMessage
	};
}

export default reduxForm({
		form: 'signup',
		fields: ['email', 'password', 'passwordConfirm'],
		validate
	}, 
	mapStateToProps, 
	actions
)(Signup);
