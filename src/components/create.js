import React, { Component } from 'react';
import { connect } from 'react-redux';
import Editor from './editor';
import { toggleNote, addBar, updateBpm } from '../actions/creation_editor';
import { setPlayingTab } from '../actions/sound_actions';

class Create extends Component {

  save() {
    this.props.save(this.props.creationEditor, this.props.activeUserEmail);
  }

  saveButton() {
    return (
      <button className='btn' onClick={this.save.bind(this)}>Save</button>
    );
  }

  render() {
    return (
      <div className='create'>
        <Editor editor={this.props.creationEditor} 
                toggleNote={this.props.toggleNote}
                toggleLoop={this.props.toggleLoop}
                updateBpm={this.props.updateBpm} 
                setPlayingTab={this.props.setPlayingTab} 
                addBar={this.props.addBar} />
        {this.saveButton()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeUserEmail: state.auth.email,
    creationEditor: state.creationEditor
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleNote: (row, col) => dispatch(toggleNote(row, col)),
    setPlayingTab: (tab) => dispatch(setPlayingTab(tab)),
    addBar: (barSize) => dispatch(addBar(barSize)),
    updateBpm: (newBpm) => dispatch(updateBpm(newBpm))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
