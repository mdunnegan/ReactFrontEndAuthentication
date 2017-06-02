import React, { Component } from 'react';
import { connect } from 'react-redux';
import Editor from './editor';
import { toggleNote, addBar, updateBpm, save } from '../actions/creation_editor';
import { setPlayingTab } from '../actions/sound_actions';

class Create extends Component {

  save() {
    this.props.save(this.props.creationEditor, localStorage.getItem('email'));
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
                addBar={this.props.addBar} 
                save={this.props.save} />
        {this.saveButton()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    creationEditor: state.creationEditor
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleNote: (row, col) => dispatch(toggleNote(row, col)),
    setPlayingTab: (tab) => dispatch(setPlayingTab(tab)),
    addBar: (barSize) => dispatch(addBar(barSize)),
    updateBpm: (newBpm) => dispatch(updateBpm(newBpm)),
    save: (editor, email) => dispatch(save(editor, email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
