import {eventBus} from "../index";

export default class GetMatrixGame {
	constructor(val) {
		this.eventBus = eventBus;
		this.col = val.col;
		this.row = val.row;
		this.htmlEl = val.htmlEl;
		this.init();
		this.eventBus.trigger('getSizeGameField', {row: this.row, col: this.col});
	}

	init() {
		this.arr = this.createMatrix();
		this.SIZE_CELL = this.getSizeCell();
		this.changeGameField(this.arr);
		this.htmlEl.addEventListener('click', this.clickToCell.bind(this));
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
		const SIZE_CELL = this.col >= this.row ? Math.floor(this.htmlEl.offsetWidth / this.col) : Math.floor(this.htmlEl.offsetHeight / this.row);
		return SIZE_CELL;
	}

	clickToCell(e) {
		this.eventBus.trigger('clickGameField', e);
	}

	changeGameField(arr) {
		this.eventBus.on('clickGameField', (e) => {
			e.preventDefault();
			let { offsetX: eX , offsetY: eY } = e;
			let col = Math.floor(eX / this.SIZE_CELL);
			let row = Math.floor(eY / this.SIZE_CELL);
			arr[row][col] === 1 ? arr[row].splice(col, 1, 0) : arr[row].splice(col, 1, 1);
			this.eventBus.trigger('drawNewGameField', {row: arr.length, col: arr[row].length});
		});
	}

	play() {

	}
}