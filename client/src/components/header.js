import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StripeWrapper from './stripeWrapper';

class Header extends Component{

	renderContent() {
		switch(this.props.auth){
			case null:
				return(
					'Loading'
				);
			case false:
				return(
					<li><a href="/auth/google">Login with Google</a></li>
				);
			default:
				return [
						<li key={1}><StripeWrapper /></li>,
						<li key={2} style={{margin: '0 20px'}}>
							Credits: {this.props.auth.credits}
						</li>,
						<li key={3}><a href="/api/logout">Logout</a></li>
				];
		}
	}

	render(){
		console.log(this.props);
		return(
			<nav>
				<div className="nav-wrapper teal lighten-2">
					<Link 
						to={this.props.auth ? '/surveys' : '/' } 
						className="left brand-logo"
					>
						&nbsp;Feedback
					</Link>
					<ul className="right">
						{this.renderContent()}
					</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps)(Header);