import React, { Component } from 'react';
import { connect } from 'react-redux';
import Editor from './editor';
import * as actions from '../actions/creation_editor';

class Create extends Component {

  render() {
    return (
      <div className='create'>
        <Editor editor={this.props.creationEditor} 
                toggleNote={this.props.toggleNote}
                toggleLoop={this.props.toggleLoop}
                updateBpm={this.props.updateBpm} />
        // submit button
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    creationEditor: state.creationEditor
  }
}

export default connect(mapStateToProps)(Create);
