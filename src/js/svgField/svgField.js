import {eventBus} from '../index';
import GetMatrixGame from './../matrix/matrix';

export default class SvgField extends GetMatrixGame {
	constructor(param) {
		super(param);
		this.eventBus = eventBus;
		this.drawSvgField();
	}

	drawSvgField() {
		this.getSvgField();
		eventBus.on('getSizeGameField', (value) => {
			this.col = value.col;
			this.row = value.row;
			this.getSvgField();
		});
	}

	getSvgField() {
		const SVG_NS  = "http://www.w3.org/2000/svg";

		this.arr = this.createArray();
		this.SIZE_CELL = this.getSizeCell();

		if (document.querySelector('#game-field').childNodes.length) {
			this.field = document.querySelector('#field');
			this.field.innerHTML = '';

		} else {
			this.field = document.createElementNS(SVG_NS, 'svg');
			this.field.id = 'field';

			this.htmlEl.appendChild(this.field);
		}

		this.fieldWrap = document.createElementNS(SVG_NS, 'rect');
		this.fieldWrap.classList.add('svg-field');

		this.field.appendChild(this.fieldWrap);

		this.field.setAttribute('width', this.col * this.SIZE_CELL);
		this.field.setAttribute('height', this.row * this.SIZE_CELL);


		for (let i = 0; i < this.arr.length; i++) {
			for (let j = 0; j < this.arr[i].length; j++) {
				if (this.arr[i][j]) {
					let figure = `<image href="../img/tongue-out.svg" x="${this.SIZE_CELL * j}" y="${this.SIZE_CELL * i}" height="${this.SIZE_CELL}" width="${this.SIZE_CELL}"/>`;
					this.field.innerHTML += figure;
				}
			}
		}
	}
}