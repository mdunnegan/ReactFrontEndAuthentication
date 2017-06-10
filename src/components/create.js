import React, { Component } from 'react';
import { connect } from 'react-redux';
import Editor from './editor';
import { toggleNote, addBar, updateBpm, save } from '../actions/creation_editor';
import { setPlayingTab, setStopPlayingTabFunctionHandle } from '../actions/sound_actions';

class Create extends Component {

  save() {
    this.props.save(this.props.creationEditor, localStorage.getItem('email'));
  }

  saveButton() {
    return (
      <div className="create__save-button"> 
        <button className='btn btn-primary' 
          onClick={this.save.bind(this)}>Save</button>
      </div>
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
                save={this.props.save} 
                setStopPlayingTabFunctionHandle={this.props.setStopPlayingTabFunctionHandle} 
                stopPlayingTabFunctionHandle={this.props.stopPlayingTabFunctionHandle} />
        {this.saveButton()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    creationEditor: state.creationEditor,
    stopPlayingTabFunctionHandle: state.playingTab.stopPlayingTabFunctionHandle
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleNote: (row, col) => dispatch(toggleNote(row, col)),
    setPlayingTab: (tab) => dispatch(setPlayingTab(tab)),
    setStopPlayingTabFunctionHandle: (handle) => dispatch(setStopPlayingTabFunctionHandle(handle)),
    addBar: (barSize) => dispatch(addBar(barSize)),
    updateBpm: (newBpm) => dispatch(updateBpm(newBpm)),
    save: (editor, email) => dispatch(save(editor, email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
