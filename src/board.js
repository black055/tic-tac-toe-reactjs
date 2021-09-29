import React from 'react';
import { Square } from './square';

export class Board extends React.Component {

    renderSquare(i) {
      if (this.props.line.includes(i)) {
        return <Square
                  key={i}
                  highlight={true}
                  value={this.props.squares[i]}
                  onClick={() => this.props.onClick(i)}
             />;
      } else
        return <Square
                  key={i}
                  highlight={false}
                  value={this.props.squares[i]}
                  onClick={() => this.props.onClick(i)}
              />;
    }
  
    render() {

        let boardHTML = [];

        for (let i = 0; i < this.props.size; i++) {
            let temp = [];
            for (let j = 0; j < this.props.size; j++) {
                temp.push( this.renderSquare(this.props.size*i + j) );
            }
            boardHTML.push(<div key={'row_'+i} className="board-row">{temp}</div>);
        }

        return (<div>{boardHTML}</div>);
    }
  }