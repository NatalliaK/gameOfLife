import {eventBus} from '../index';

export default class Controls {
	constructor(htmlEl) {
		this.htmlEl = htmlEl;

		this.render();
		eventBus.on('setSpeedGame', this.setSpeedGame.bind(this));

		this.htmlEl.querySelector('#btn-play').addEventListener('click', (e) => {
			let parentEl = e.target.parentNode;
			if (e.target.id === 'play') {
				parentEl.innerHTML = '<img id="pause" src="img/pause.png" class="controls__img">';
				eventBus.trigger('matrix: playGame', this.setSpeedGame());
			} else if (e.target.id = 'pause') {
				parentEl.innerHTML = '<img id="play" src="img/play.png" class="controls__img">';
				eventBus.trigger('matrix: stopGame');
			}
		});

		this.htmlEl.querySelector('#btn-next').addEventListener('click', _ => {
			eventBus.trigger('matrix: stopGame');
			eventBus.trigger('matrix: nextStep');
		});

		this.htmlEl.querySelector('#btn-back').addEventListener('click', _ => {
			eventBus.trigger('matrix: stopGame');
			eventBus.trigger('matrix: prevStep');
		});

		this.htmlEl.addEventListener('change', (e) => {
			if (e.target.tagName === 'SELECT') {
			eventBus.trigger('changeSizeGameField', this.setSizeField.bind(this));
			} else if(e.target.id === 'speed' && this.htmlEl.querySelector('#pause')) {
				eventBus.trigger('matrix: stopGame');
				eventBus.trigger('matrix: playGame', this.setSpeedGame());
			}
		});
	}

	render() {
		this.htmlEl.innerHTML = `<button id="btn-back"><img src="img/back.png" class="controls__img"></button><button id="btn-play"><img id="play" src="img/play.png" class="controls__img"></button><button id="btn-next"><img src="img/next.png" class="controls__img"></button><label><span>Выберите ширину поля:</span><select name="x" id="x"><option value="10" selected>10</option><option value="20">20</option><option value="30">30</option><option value="40">40</option><option value="50">50</option><option value="60">60</option><option value="70">70</option><option value="80">80</option><option value="90">90</option><option value="100">100</option></select></label><label><span>Выберите высоту поля:</span><select name="y" id="y"><option value="10" selected>10</option><option value="20">20</option><option value="30">30</option><option value="40">40</option><option value="50">50</option><option value="60">60</option><option value="70">70</option><option value="80">80</option><option value="90">90</option><option value="100">100</option></select></label><label><span>Скорость</span><input id="speed" type="range" min="1" max="10" step="1" value="5"></label><button>Начать новую игру</button>`;
	}

	setSizeField() {
		this.widthField = this.htmlEl.querySelector('#x').options[this.htmlEl.querySelector('#x').selectedIndex].value;
		this.heightField = this.htmlEl.querySelector('#y').options[this.htmlEl.querySelector('#y').selectedIndex].value;
		return {col: this.widthField, row: this.heightField};
	}

	setSpeedGame() {
		this.speed = this.htmlEl.querySelector('#speed').value;
		return this.speed;
	}
}
