import {eventBus} from '../index';
import GetMatrixGame from './../matrix/matrix';

export default class TextField extends GetMatrixGame {
	constructor(param) {
		super(param);
		this.eventBus = eventBus;
		this.drawTextField();
	}

	drawTextField() {
		this.getTextField();
		this.eventBus.on('drawNewGameField', (value) => {
		this.col = value.col;
		this.row = value.row;
		this.getTextField();
		});
	}

	getTextField() {
		console.log(this.col, this.row);
		this.field = '';
		if (!document.querySelector('pre')) {
			var pre = document.createElement('pre');
			this.htmlEl.appendChild(pre);
			pre.classList.add('text-field');
		} else {
			pre = document.querySelector('pre');
		}
		pre.style.fontSize = this.SIZE_CELL * 2 + 'px';

		for (let i = 0; i < this.arr.length; i++) {
			for (let j = 0; j < this.arr[i].length; j++) {
				this.field += this.arr[i][j] ? 'x' : ' ';
			}
			this.field += '\n';
		}
		pre.innerHTML = this.field;
	}
}