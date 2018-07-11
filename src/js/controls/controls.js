import {eventBus} from '../index';

export default class Controls {
	constructor(htmlEl) {
		this.eventBus = eventBus;
		this.htmlEl = htmlEl;
		this.render();

		if (this.htmlEl.querySelector('#btn-play')) {
			this.play = this.htmlEl.querySelector('#btn-play');
			this.play.addEventListener('click', (e) => {
				this.eventBus.trigger('play');
			});
		} else if (this.htmlEl.querySelector('#btn-stop')) {
			this.stop = this.htmlEl.querySelector('#btn-stop');
			this.stop.addEventListener('click', (e) => {
				this.eventBus.trigger('stop');
			});
		}

		this.htmlEl.addEventListener('change', (e) => {
			if (e.target.tagName === 'SELECT') {
				this.widthField = this.htmlEl.querySelector('#x').options[this.htmlEl.querySelector('#x').selectedIndex].value;
				this.heightField = this.htmlEl.querySelector('#y').options[this.htmlEl.querySelector('#y').selectedIndex].value;

				this.eventBus.trigger('drawNewGameField', {col: this.widthField, row: this.heightField});
			}
		});

	}

	render() {
		this.htmlEl.innerHTML = `<button id="btn-back"><img src="img/back.png" class="controls__img"></button><button id="btn-play"><img src="img/play.png" class="controls__img"></button><button id="btn-next"><img src="img/next.png" class="controls__img"></button><label><span>Выберите ширину поля:</span><select name="x" id="x"><option value="10" selected>10</option><option value="20">20</option><option value="30">30</option><option value="40">40</option><option value="50">50</option><option value="60">60</option><option value="70">70</option><option value="80">80</option><option value="90">90</option><option value="100">100</option></select></label><label><span>Выберите высоту поля:</span><select name="y" id="y"><option value="10" selected>10</option><option value="20">20</option><option value="30">30</option><option value="40">40</option><option value="50">50</option><option value="60">60</option><option value="70">70</option><option value="80">80</option><option value="90">90</option><option value="100">100</option></select></label><label><span>Скорость</span><input id="speed" type="range" min="1" max="10" step="1"></label>`;
	}

	event() {

	}
}
