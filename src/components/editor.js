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
      <div>
        <input type='text' value={this.props.editor.bpm} onChange={(e) => this.updateBpm(e.target.value)} />
      </div>
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
        labels.push(<td key={i}>{labelVal}</td>);
      } else if (i % measureLength == measureLength/2) {
        const labelVal = "+";
        labels.push(<td key={i}>{labelVal}</td>);
      } else {
        labels.push(<td key={i}></td>);
      }
    }
    return <tr>{labels}</tr>;
  }

  addBar() {
    if (this.props.addBar) {
      return(
        <button className='btn btn-primary' onClick={this.props.addBar.bind(this, 16)}>Add Bar</button>
      );
    }
  }

  stopPlaying() {
    if (this.state.stopPlayingTabFunction) {
      clearInterval(this.state.stopPlayingTabFunction)
    }
  }

  renderRow(noteRow, rowIdx) {
    const that = this;
    return (
      <tr className='note-row' key={rowIdx}>
        {noteRow.map((note, colIdx) =>

          <td key={(rowIdx*16)+(colIdx*256)}>
            <input
              type='checkbox'
              checked={ this.props.editor.noteRows[rowIdx][colIdx] }
              onChange={ () => {
                that.toggleNote(rowIdx, colIdx)
              }}
            />
          </td>
        )}
      </tr>
    );
  }

  toggleNote(rowIdx, colIdx) {
    if (this.props.toggleNote){
      this.props.toggleNote(rowIdx, colIdx);
    }
  }

  play() {
    let that = this;
    this.props.setPlayingTab(this.props.editor);

    const { hihat, snare, bass } = this.state;

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

    let stopPlayingTabFunction = setInterval(function(){
      const measureLength = that.props.editor.noteRows[0].length;
      column = playColumn(column, measureLength);
    }, interval);

    this.setState({stopPlayingTabFunction: stopPlayingTabFunction});
  }

  render() {
    return (
      <div className='editor'>
        <table>
          <tbody>
            {this.renderLabels()}
            {this.props.editor.noteRows.map(this.renderRow.bind(this))}
          </tbody>
        </table>
        {this.renderBpm()}
        <button className='btn btn-primary' onClick={this.play.bind(this)}>Play</button>
        <button className='btn btn-primary' onClick={this.stopPlaying.bind(this)}>Stop</button>
        {this.addBar()}
      </div>
    );
  }
}

