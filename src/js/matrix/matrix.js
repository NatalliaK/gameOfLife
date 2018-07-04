export default function getMatrix(val) {
	let col = val.col;
	let row = val.row;

	var arr = [];
	for (let i = 0; i <= row; i++) {
		arr.push([]);
		for (let j = 0; j <= col; j++) {
			arr[i].push(' ');
		}
	}
	console.log(arr);
}