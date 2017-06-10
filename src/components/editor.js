import React, { Component } from 'react';

export default class Editor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hihat: '../../sounds/hihat2.wav',
      snare: '../../sounds/snare.wav',
      bass: '../../sounds/bass.wav',
      stopPlayingTabFunction: null
    }
  }

  componentWillUnmount() {
    this.stopPlaying();
  }

  renderBpm() {
    return (
      <input type='text' value={this.props.editor.bpm} onChange={(e) => this.updateBpm(e.target.value)} />
    );
  }

  updateBpm(newBpm) {
    this.stopPlaying();
    if (this.props.updateBpm) {
      this.props.updateBpm(newBpm);
    }
  }

  renderLabels() {
    const { measureLength, subdivisionQuantifier, numBars } = this.props.editor;
    const numNotes = measureLength * subdivisionQuantifier * numBars;
    let labels = [];

    for (let i = 0; i < numNotes; i++) {
      if (i % measureLength == 0) {
        const labelVal = i/measureLength+1;
        labels.push(<span key={i}>{labelVal}</span>);
      } else if (i % measureLength == measureLength/2) {
        const labelVal = "+";
        labels.push(<span key={i}>{labelVal}</span>);
      } else {
        labels.push(<span key={i}></span>);
      }
    }
    return <div>{labels}</div>;
  }

  addBar() {
    if (this.props.addBar) {
      return(
        <button className='controls-bar__add-bar-btn btn btn-primary' 
            onClick={this.props.addBar.bind(this, 16)}>Add Bar</button>
      );
    }
  }

  stopPlaying() {
    if (this.props.stopPlayingTabFunctionHandle) {
      clearInterval(this.props.stopPlayingTabFunctionHandle);
    }
  }

  renderRow(noteRow, rowIdx) {
    const that = this;
    return (
      <div className='editor__note-row' key={rowIdx}>
        {noteRow.map((note, colIdx) =>
          <input
            key={(rowIdx*16)+(colIdx*256)}
            type='checkbox'
            checked={ this.props.editor.noteRows[rowIdx][colIdx] }
            onChange={ () => {
              that.toggleNote(rowIdx, colIdx)
            }}
          />
        )}
      </div>
    );
  }

  toggleNote(rowIdx, colIdx) {
    if (this.props.toggleNote){
      this.props.toggleNote(rowIdx, colIdx);
    }
  }

  play() {
    this.stopPlaying();
    this.props.setPlayingTab(this.props.editor);

    const { hihat, snare, bass } = this.state;

    let that = this;
    const playColumn = function(column, measureLength){
      if (that.props.editor.noteRows[0][column]){
        (new Audio(hihat)).play();
      }
      if (that.props.editor.noteRows[1][column]){
        (new Audio(snare)).play();
      }
      if (that.props.editor.noteRows[2][column]){
        (new Audio(bass)).play();
      }
      return (column+1) % measureLength;
    }

    let column = 0;
    let bpm = this.props.editor.bpm;
    let interval = (1/(bpm/60))*1000/4;

    let stopPlayingTabFunctionHandle = setInterval(function(){
      const measureLength = that.props.editor.noteRows[0].length;
      column = playColumn(column, measureLength);
    }, interval);

    this.props.setStopPlayingTabFunctionHandle(stopPlayingTabFunctionHandle);
  }

  render() {
    return (
      <div className='editor'>
        <div className='editor__notes'>
          {this.props.editor.noteRows.map(this.renderRow.bind(this))}
        </div>
        <div className='editor__controls-bar'>
          <button className='editor__play-btn btn btn-primary' onClick={this.play.bind(this)}>Play</button>
          <button className='editor__stop-btn btn btn-primary' onClick={this.stopPlaying.bind(this)}>Stop</button>
          <input className='editor__update-bpm-input' type='text' value={this.props.editor.bpm} 
              onChange={(e) => this.updateBpm(e.target.value)} />
        </div>
      </div>
    );
  }
}

