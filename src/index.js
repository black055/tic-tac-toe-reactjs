import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  function Square(props) {
    if (props.highlight) {
      return (
        <button
            className="square highlight"
            onClick={() => props.onClick()}
        >
          <strong>{props.value}</strong>
        </button>
      );
    } else {
      return (
        <button
            className="square"
            onClick={() => props.onClick()}
        >
          {props.value}
        </button>
      );
    }
  }

  class Board extends React.Component {

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
  
  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeSize = this.handleChangeSize.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                newMark: null,
                }],
            xIsNext: true,
            stepNumber: 0,
            size: 3,
            winner: null,
            line: [],
            isIncre: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares, this.state.size) != null || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        let winner = calculateWinner(squares, this.state.size);
        if (winner) {
          
          let line = [];
          for (let k = 0; k < winner.line.length; k++) {
            line.push(winner.line[k].row * this.state.size + winner.line[k].col);
          }
          this.setState({
            history: history.concat([{ squares: squares, newMark: i  }]),
            stepNumber: history.length,
            winner: winner.player,
            line: line,
          });
        } else {
          this.setState({
            history: history.concat([{ squares: squares, newMark: i }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
          });
        }
    }

    jumpTo(step) {
      const history = this.state.history.slice(0, step + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      let winner = calculateWinner(squares, this.state.size);
      if (winner != null) {
        let line = [];
          for (let k = 0; k < winner.line.length; k++) {
            line.push(winner.line[k].row * this.state.size + winner.line[k].col);
          }
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
          winner: winner.player,
          line: line,
        });
      } else {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
          winner: null,
          line: [],
        });
      }
        
    }

    handleChangeSize(e) {
        this.setState({
            history: [{
                squares: Array(e.target.value**2).fill(null),
                }],
            xIsNext: true,
            stepNumber: 0,
            size: e.target.value,
            winner: null,
            line: [],
        });
    }

    handleSort() {
      this.setState( {
        isIncre: !this.state.isIncre
      } );
    }

    render() {
        const history = this.state.history; 
        const current = history[this.state.stepNumber];

        const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move + ' (' + Math.floor(step.newMark / this.state.size) + ', ' + step.newMark % this.state.size + ')':
              'Go to game start';

            if (move === this.state.stepNumber) return (
                <li key={move}>
                  <button onClick={() => this.jumpTo(move)}><strong>{desc}</strong></button>
                </li>
            );
            else return (
              <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
        });

        let status;
        if (this.state.winner != null) {
          status = 'Winner: ' + this.state.winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }    

      return (
        <div className="screen">
            <div className="game-size-controller">
                <span>Size of the game: 
                    <input type="number" min="3" defaultValue="3" className="input-number"
                    onChange={this.handleChangeSize} />
                </span>
            </div>

            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        line={this.state.line}
                        onClick={(i) => this.handleClick(i)}
                        size={this.state.size} 
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button className="sort-button" onClick={this.handleSort}><strong>Sort: </strong> {(this.state.isIncre) ? 'increasing' : 'decreasing'} </button>
                    <div className="text">History list: location each move in <strong>(row, col)</strong> format</div>
                    <ol >{(this.state.isIncre) ? moves : moves.reverse()}</ol>
                </div>
            </div>
        </div>
      );
    }
  }

  function to2DSquare(squares) {
    let result = Array(Math.sqrt(squares.length));
    for (let i = 0; i < result.length; i++) {
      result[i] = Array(Math.sqrt(squares.length)).fill(null);
    }

    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result.length; j++) {
        result[i][j] = squares[i*result.length + j];
      }
    }
    return result;
  }

  function checkLine(line, streakToWin) {
    for (let i = 0, j = 0; i < line.length - 1; i = j) {
      if (line[i] != null) {
        for (j = i + 1; j < line.length && line[j] === line[i]; j++) { }
        // Nếu chuỗi kí tự đã đủ điều kiện thắng
        if (j - i >= streakToWin) {
          return line.length - j;
        }
      } else j = i + 1;
    }
    return null;
  }

  function calculateWinner(squares, size){
    let newSquares = to2DSquare(squares);
    let streakToWin = (size > 5) ? 5 : parseInt(size);
    // Kiểm tra các dòng
    for (let i = 0; i< newSquares.length; i++) {
      let isWin = checkLine(newSquares[i], streakToWin);
      if (isWin != null) {
        let line = [];
        for (let point = 0; point < streakToWin; point++) {
          line.push({
            row: i,
            col: newSquares.length - isWin - 1 - point,
          });
        }
        let result = {
          player: newSquares[i][newSquares.length - 1 - isWin],
          line: line,
        };
        return result;
      }
    }

    // Kiểm tra các cột
    for (let i = 0; i< newSquares.length; i++) {
      let isWin = checkLine(newSquares.map(e => e[i]), streakToWin);
      if (isWin != null) {
        let line = [];
        for (let point = 0; point < streakToWin; point++) {
          line.push({
            row: newSquares.length - isWin - 1 - point,
            col: i,
          });
        }
        let result = {
          player: newSquares.map(e => e[i])[newSquares.length - 1 - isWin],
          line: line,
        };
        return result;
      }
    }

    // Kiểm tra đường chéo theo hướng /
    for (let i = 0; i < 2 * newSquares.length - 1; i++) {
      let diagonal = [];
      let lastPoint;
      for (let j = 0; j < newSquares.length; j++) {
        let x = i - j;
        if (x >= 0 && x < newSquares.length) {
          diagonal.push(newSquares[j][x]);
          lastPoint = {
            row: j,
            col: x,
          }
        }
      }

      let isWin = checkLine(diagonal, streakToWin);
      if (isWin != null) {
        let line = [];
        for (let point = 0; point < streakToWin; point++) {
          if (size > 5) {
            line.push({
              row: lastPoint.row - isWin - point,
              col: lastPoint.col + isWin + point,
            });
          } else {
            line.push({
              row: lastPoint.row - point,
              col: lastPoint.col + point,
            });
          }
        }
        let result = {
          player: diagonal[diagonal.length - 1 - isWin],
          line: line,
        };
        return result;
      }
    }

    // Kiểm tra đường chéo theo hướng \
    for (let i = 0; i < 2 * newSquares.length - 1; i++) {
      let diagonal = [];
      let lastPoint;
      for (let j = 0; j < newSquares.length; j++) {
        let x = i - (newSquares.length - 1 - j);
        if (x >= 0 && x < newSquares.length) {
          diagonal.push(newSquares[j][x]);
          lastPoint = {
            row: j,
            col: x,
          }
        }
      }
      
      let isWin = checkLine(diagonal, streakToWin);
      if (isWin != null) {
        let line = [];
        for (let point = 0; point < streakToWin; point++) {
          if (size > 5) {
            line.push({
              row: lastPoint.row - isWin - point,
              col: lastPoint.col - isWin - point,
            });
          } else {
            line.push({
              row: lastPoint.row - point,
              col: lastPoint.col - point,
            })
          }
        }
        let result = {
          player: diagonal[diagonal.length - 1 - isWin],
          line: line,
        };
        return result;
      }
    }

    if (squares.includes(null) === false) {
      let result = {
        player: 'draw',
        line: [],
      }
      return result;
    }

    return null;
  }
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );  