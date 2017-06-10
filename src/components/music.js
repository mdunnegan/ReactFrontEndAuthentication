import React, { Component } from 'react';
import { connect } from 'react-redux';
import Editor from './editor';
import { updateBpm } from '../actions/creation_editor';
import { fetchTabs } from '../actions/music_actions';
import { setPlayingTab, setStopPlayingTabFunctionHandle } from '../actions/sound_actions';

class Music extends Component {

  componentWillMount() {
    this.props.fetchTabs(localStorage.getItem('email'));
  }

  render() {
    return (
      <div className='music'>
        {this.props.tabs.map((tab, i) =>
          <Editor key={i} 
              editor={tab}
              setPlayingTab={this.props.setPlayingTab} 
              setStopPlayingTabFunctionHandle={this.props.setStopPlayingTabFunctionHandle} 
              stopPlayingTabFunctionHandle={this.props.stopPlayingTabFunctionHandle} /> 
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tabs: state.myMusic,
    stopPlayingTabFunctionHandle: state.playingTab.stopPlayingTabFunctionHandle
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateBpm: (bpm) => dispatch(updateBpm(bpm)),
    setPlayingTab: (tab) => dispatch(setPlayingTab(tab)),
    setStopPlayingTabFunctionHandle: (handle) => dispatch(setStopPlayingTabFunctionHandle(handle)),
    fetchTabs: (email) => dispatch(fetchTabs(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Music);