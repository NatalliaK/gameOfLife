import {eventBus} from "../index";
import Controls from '../controls/controls';

export default class GetMatrixGame {
	constructor(param) {
		this.controlsCont = param.controlsCont;
		this.fieldCont = param.fieldCont;
		this.controls = new Controls(this.controlsCont);
		this.state = param.state;
		this.count = this.state.count || 1;
		this.init();
	}

	init() {
		console.log('init');
		this.drawNewField();
		eventBus.once('clickField', this.clickToCell.bind(this));
		eventBus.on('changeSizeGameField', this.drawNewField.bind(this));
		eventBus.on('matrix: playGame', this.playGame.bind(this));
		eventBus.on('matrix: stopGame', this.stopGame.bind(this));
		this.changeViewGameField();
		this.fieldCont.addEventListener('click', this.clickToCell.bind(this));
		this.createNextStep();
		this.createPrevStep();
	}

	drawNewField() {
		this.timer;
		this.sizeField = this.controls.setSizeField();
		this.row = +this.sizeField.row;
		this.col = +this.sizeField.col;
		this.arr = this.state[this.count] || this.createMatrix();
		this.SIZE_CELL = this.getSizeCell();
		this.state[this.count] = this.arr;
		this.state.count = this.count;
		eventBus.trigger('field: drawGameField', {arr: this.arr, SIZE_CELL: this.SIZE_CELL, htmlEl: this.fieldCont});
	}

	createMatrix() {
		let arr = [];
		for (let i = 0; i < this.row; i++) {
			arr.push([]);
			for (let j = 0; j < this.col; j++) {
				if ((i === 0 && j === 0) || (i === 1 && (j === 1 || j === 2)) || (i === 2 && (j === 0 || j === 1))) {
					arr[i].push(1);
				} else {
					arr[i].push(0);
				}
			}
		}
		return arr;
	}

	getSizeCell() {
		const SIZE_CELL = this.col > this.row ? Math.floor( document.documentElement.clientWidth * 0.7 / this.col) : Math.floor(document.documentElement.clientHeight * 0.7 / this.row);
		return SIZE_CELL;
	}

	clickToCell(e) {
		eventBus.trigger('matrix: clickGameField', e);
	}

	changeViewGameField() {
		eventBus.on('matrix: clickGameField', (e) => {
			e.preventDefault();
			let { offsetX: eX , offsetY: eY } = e;
			let col = Math.floor(eX / this.SIZE_CELL);
			let row = Math.floor(eY / this.SIZE_CELL);
			this.arr[row][col] === 1 ? this.arr[row].splice(col, 1, 0) : this.arr[row].splice(col, 1, 1);
			eventBus.trigger('field: drawGameField', {arr: this.state[this.count], SIZE_CELL: this.SIZE_CELL, htmlEl: this.fieldCont});
		});
	}

	createNextStep() {
		eventBus.on('matrix: nextStep', () => {
			var nextArr = [];
			var neighbors = 0;

			for (let i = 0; i < this.arr.length; i++) {
				nextArr[i] = [];
				for (let j = 0; j < this.arr[i].length; j++) {

					if (this.arr[i - 1]) {
						this.arr[i - 1][j] === 1 ? neighbors++ : neighbors;
					}
					if (this.arr[i + 1]) {
						this.arr[i + 1][j] === 1 ? neighbors++ : neighbors;
					}

					if (this.arr[i][j + 1]) {
						this.arr[i][j + 1] === 1 ? neighbors++ : neighbors;
					}

					if (this.arr[i][j - 1]) {
						this.arr[i][j - 1] === 1 ? neighbors++ : neighbors;
					}

					if (this.arr[i - 1] && this.arr[i - 1][j - 1]) {
						this.arr[i - 1][j - 1] === 1 ? neighbors++ : neighbors;
					}

					if (this.arr[i - 1] && this.arr[i - 1][j + 1]) {
						this.arr[i - 1][j + 1] === 1 ? neighbors++ : neighbors;
					}

					if (this.arr[i + 1] && this.arr[i + 1][j + 1]) {
						this.arr[i + 1][j + 1] === 1 ? neighbors++ : neighbors;
					}

					if (this.arr[i + 1] && this.arr[i + 1][j - 1]) {
						this.arr[i + 1][j - 1] === 1 ? neighbors++ : neighbors;
					}

					if (this.arr[i][j] === 0 && neighbors === 3) {
						nextArr[i].push(1);
					} else if (this.arr[i][j] === 1 && (neighbors === 2 || neighbors === 3)) {
						nextArr[i].push(1);
					} else {
						nextArr[i].push(0);
					}
					neighbors = 0;
				}
			}

			this.arr = nextArr;
			this.count++;
			console.log(this.count);
			this.state[this.count] = this.arr;
			this.state.count = this.count;
			eventBus.trigger('field: drawGameField', {arr: this.state[this.count], SIZE_CELL: this.SIZE_CELL, htmlEl: this.fieldCont});
			this.gameOver();
		});
	}

	createPrevStep() {
		eventBus.on('matrix: prevStep', () => {
			if (!this.state[this.count] || this.count === 1) {
				return;
			} else {
				delete this.state[this.count];
				this.count--;
				this.state.count = this.count;
				eventBus.trigger('field: drawGameField', {arr: this.state[this.count], SIZE_CELL: this.SIZE_CELL, htmlEl: this.fieldCont});
			}
		});
	}

	playGame(speed) {
		this.timer = setInterval( _ => {
			eventBus.trigger('matrix: nextStep');
		}, 1000 * 1.5 / speed);
	}

	stopGame() {
		clearInterval(this.timer);
	}

	gameOver() {
		var stopGame = true;

		this.state[this.count].forEach(el => {
			el.forEach(elem => {
				if (elem === 1) {
					stopGame = false;
					return;
				}
			});
			if (stopGame === false) return;
		});

		this.state[this.count].join() === this.state[this.count - 1].join() ? stopGame = true : stopGame = false;

		if (stopGame === true) {
			console.log('Конец игры!');
			eventBus.trigger('matrix: stopGame');
			this.fieldCont.parentNode.querySelector('#btn-play').innerHTML = '<img src="img/pause.png" class="controls__img">';
			// eventBus.off('changeSizeGameField');
			// eventBus.off('matrix: playGame');
			// eventBus.off('matrix: stopGame');
			// eventBus.off('matrix: clickGameField');
			//delete eventBus.listeners;
		}
	}
}