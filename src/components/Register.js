import React from 'react';
import { BACKEND_SERVER_URL } from 'constants.js';

// function Register( {onRouteChange} ) {
class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			error: ''
		}
	}

	onNameChange = (event) => {
		this.setState( {name: event.target.value} );
	}

	onEmailChange = (event) => {
		this.setState( {email: event.target.value} );
	}

	onPasswordChange = (event) => {
		this.setState( {password: event.target.value} );
	}

	onSubmitRegister = (event) => {
		event.preventDefault();
		fetch(`${BACKEND_SERVER_URL}/register`, {
			method: 'post',
			headers: {'content-Type': 'application/json'},
			body: JSON.stringify( {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			})
		})
		.then(response => response.json())
		.then(response => {
			console.log(response);
			if ( typeof response === 'object') {
				this.props.loadUser(response);
				this.props.onRouteChange('home');
			}
			else if (typeof response === 'string') {
				this.setState( {error: response} );
			}
		});
	}

	render() {
		const { onRouteChange } = this.props;
		let error = this.state.error.length > 0 ? this.state.error : "";
		return (
			<main className="pa4 br3 ba">
				<form className="measure center">
					<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
						<legend className="f4 fw6 ph0 mh0">Register</legend>
						<div className="mt3">
							<label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
							<input className="pa2 input-reset ba bg-transparent w-100"
								type="text"
								name="name"
								id="name"
								onChange={this.onNameChange}
							/>
						</div>
						<div className="mt3">
							<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
							<input className="pa2 input-reset ba bg-transparent w-100"
								type="email"
								name="email-address"
								id="email-address"
								onChange={this.onEmailChange}
							/>
						</div>
						<div className="mv3">
							<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
							<input className="b pa2 input-reset ba bg-transparent w-100"
								type="password"
								name="password"
								id="password"
								onChange={this.onPasswordChange}
							/>
						</div>
					</fieldset>
					<div className="">
						<input
							className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
							type="submit"
							value="Register"
							onClick={this.onSubmitRegister}
						/>
						<p>{error}</p>
					</div>
					<div className="lh-copy mt3">
						<p href="#0" className="f6 link dim black db pointer" onClick={ () => onRouteChange("signin") }>Sign in</p>
					</div>
				</form>
			</main>
		);
	}
}

export default Register;
