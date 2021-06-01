import React from "react";
import Board from "./Board";

export default class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Xisnext: true,
			stepNumber: 0,
			history: [{ squares: Array(9).fill(null) }],
		};
		this.handleClick.bind(this);
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			Xisnext: this.state.stepNumber % 2 === 0,
			history: this.state.history.slice(0, step + 1),
		});
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		const Winners = calculateWinner(squares);
		if (Winners || squares[i]) {
			return;
		}
		squares[i] = this.state.Xisnext ? "X" : "O";
		this.setState({
			history: history.concat({ squares: squares }),
			Xisnext: !this.state.Xisnext,
			stepNumber: history.length,
		});
		return null;
	}

	render() {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares;
		const Winners = calculateWinner(squares);

		const moves = history.map((step, move) => {
			const desc = move ? "Goto step" + move : "start the game";
			return (
				<li key={move}>
					<button
						className="learn-more"
						onClick={() => {
							this.jumpTo(move);
						}}
					>
						{desc}
					</button>
				</li>
			);
		});
		let status;
		if (!Winners && history.length === 10) {
			status = "Match Draw!";
		} else if (history.length === 1) {
			status = "Start the Match...!";
		} else {
			status = Winners
				? "Winner is " + Winners
				: (this.state.Xisnext ? "X" : "O") + " is to Play.";
		}
		return (
			<div className="game">
				<div className="game-board">
					<Board
						onClick={(i) => {
							this.handleClick(i);
						}}
						squares={current.squares}
					/>
					<div className="txt"></div>
				</div>
				<div className="game-info">
					<div>
						<b>{status}</b>
					</div>
					<ul>{moves}</ul>
				</div>
			</div>
		);
	}
}
const calculateWinner = (squares) => {
	const winnerLines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < winnerLines.length; i++) {
		const [a, b, c] = winnerLines[i];
		if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
			return squares[a];
		}
	}
	return null;
};
