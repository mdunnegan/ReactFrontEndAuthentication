import React, { Component } from 'react';

export default class Editor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hihat: new Audio('../../sounds/hihat2.wav'),
      snare: new Audio('../../sounds/snare.wav'),
      bass: new Audio('../../sounds/bass.wav'),
      stopPlayingTabFunction: null
    }
  }

  componentWillUnmount() {
    this.stopPlaying();
  }

  attemptAddBar(barSize) {
    if (this.props.addBar) {
      this.props.addBar(barSize);
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
                that.attemptToggleNote(rowIdx, colIdx)
              }}
            />
          </td>
        )}
      </tr>
    );
  }

  attemptToggleNote(rowIdx, colIdx) {
    if (this.props.toggleNote){
      this.props.toggleNote(rowIdx, colIdx);
    }
  }

  play() {
    let that = this;
    this.props.setPlayingTab(this.props.editor);

    const playColumn = function(column, measureLength){
      if (that.props.editor.noteRows[0][column]){
        that.state.hihat.play();
      }
      if (that.props.editor.noteRows[1][column]){
        that.state.snare.play();
      }
      if (that.props.editor.noteRows[2][column]){
        that.state.bass.play();
      }
      return (column+1) % measureLength;
    }

    let column = 0;
    let stopPlayingTabFunction = setInterval(function(){
      const measureLength = that.props.editor.noteRows[0].length;
      column = playColumn(column, measureLength);
    }, 100);

    this.setState({stopPlayingTabFunction: stopPlayingTabFunction});
  }

  render() {
    return (
      <div className='editor'>
        <table>
          <tbody>
            {this.props.editor.noteRows.map(this.renderRow.bind(this))}
          </tbody>
        </table>
        <button className='btn btn-primary' onClick={this.play.bind(this)}>Play</button>
        <button className='btn btn-primary' onClick={this.stopPlaying.bind(this)}>Stop</button>
        <button className='btn btn-primary' onClick={this.attemptAddBar.bind(this, 16)}>Add Bar</button>
      </div>
    );
  }
}

