import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/index';

class Signin extends Component {

	onSubmit({ email, password }) {
		this.props.signinUser({ email, password });
	}

	renderAlert() {
		if (this.props.errorMessage){
			return(
				<div className='alert alert-danger'>
					<strong>Oops! Bad login info</strong>
				</div>
			);
		}
	}

	render() {
		// possible because of reduxForm
		const { handleSubmit, fields: { email, password } } = this.props;

		// This version of ReduxForm eliminates the need for `handleSubmit(this.onSubmit.bind(this))`
		// I went crazy 
		// Then I added it again and it worked
		// I went crazy
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<fieldset className='form-group'>
					<label>Email:</label>
					<input {...email} className='form-control' />
				</fieldset>
				<fieldset className='form-group'>
					<label>Password:</label>
					<input {...password} type='password' className='form-control' />
				</fieldset>
				{this.renderAlert()}
				<button action='submit' className='btn btn-primary'>Sign In</button>
			</form>
		);
	}
}

function mapStateToProps(state) {
	// RETURN THE OBJECT
	return {
		errorMessage: state.auth.errorMessage
	};
}

export default reduxForm({
		form: 'signin',
		fields: ['email', 'password']
	}, 
	mapStateToProps, 
	actions
)(Signin);