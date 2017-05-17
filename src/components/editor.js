import React, { Component } from 'react';

export default class Editor extends Component {

  renderRow(noteRow, rowIdx) {

    return (
      <tr className='note-row' key={rowIdx}>
        {noteRow.map((note, colIdx) =>

          <td key={(rowIdx*16)+(colIdx*256)}>
            <input
              type='checkbox'
              checked={ noteRow[rowIdx][colIdx] }
              onChange={ () => 
                this.attemptToggleNote.call(this, rowIdx, colIdx) 
              } 
            />
          </td>
        )}
      </tr>
    );
  }

  attemptToggleNote(rowIdx, colIdx) {
    if (this.props.toggleNote){
      this.toggleNote.call(this, rowIdx, colIdx);
    }
  }

  render() {

    return (
      <div className='editor'>
        <table>
          <tbody>
            {this.props.editor.noteRows.map(this.renderRow.bind(this))}
          </tbody>
        </table>
      </div>
    );
  }
}

