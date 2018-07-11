import {eventBus} from '../index';
import GetMatrixGame from './../matrix/matrix';

export default class CanvasField extends GetMatrixGame {
	constructor(param) {
		super(param);
		this.eventBus = eventBus;
		this.drawCanvasField();
	}

	drawCanvasField() {
		this.getCanvasField();
		this.eventBus.on('getSizeGameField', (value) => {
			this.col = value.col;
			this.row = value.row;
			this.getCanvasField();
		});
	}

	getCanvasField() {
		this.arr = this.createArray();
		this.SIZE_CELL = this.getSizeCell();
		if (!document.querySelector('#canvas')) {
			this.canvas = document.createElement('canvas');
			this.canvas.id = 'canvas';
			this.canvas.classList.add('canvas-field');
		} else {
			this.canvas = document.querySelector('#canvas');
		}
		this.ctx = this.canvas.getContext('2d');
		this.htmlEl.appendChild(this.canvas);
		this.canvas.width = this.SIZE_CELL * this.col;
		this.canvas.height = this.SIZE_CELL * this.row;
		this.canvas.style.backgroundColor = '#a7d66c';
		var img = new Image();
		drawPict(this.arr, this.ctx, this.SIZE_CELL);

		function drawPict(arr, ctx, sizeCell) {
			img.addEventListener("load", function() {
				for (let i = 0; i < arr.length; i++) {
					for (let j = 0; j < arr[i].length; j++) {
						if (arr[i][j]) {
							let x = j * sizeCell;
							let y = i * sizeCell;

							ctx.drawImage(img,x,y,sizeCell,sizeCell);
						} else {
							ctx.stroke();
						}
					}
				}
			}, false);
			img.src = "img/smile.png";
		}
	}
}