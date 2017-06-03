import React, { Component } from 'react';
import { connect } from 'react-redux';

class Welcome extends Component {
  render() {
    if (this.props.authenticated) {
      return <div>Thanks for being a part of this experiment!</div>
    } else {
      return <div>Welcome to Drum Hub! Log in or create an account to start rocking out</div>
    }
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Welcome);