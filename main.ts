class Point {
	constructor(public x: number, public y: number) {}
}

class Polygon {
	constructor(public points: Point[]) {}
}

class Circle {
	constructor(public radius: number, public center: Point) {}
}

let mouse = {x: undefined, y: undefined};

function hexToRGB(hex: string, alpha: string) {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);

	if (alpha) {
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	} else {
		return `rgba(${r}, ${g}, ${b})`;
	}
}

class App {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	private origin: Point;
	// the number of pixels per one step
	private stepSize: number;
	// distance one step corresponds with
	private stepRange: number;
	private colors = ['#9c7979', '#9c9279', '#799c7d', '#798c9c', '#93799c']
	/* private allShapes: Map<number, Polygon|Circle>; */
	private lastMousePos = {x: undefined, y: undefined};
	private mouseIsDown = false;

	constructor() {
		let canvas = document.getElementById('canv') as HTMLCanvasElement;
		let ctx = canvas.getContext('2d');
		this.ctx = ctx;
		this.canvas = canvas;

		this.addMouseListeners();

		this.stepSize = 50;
		this.stepRange = 1;

		this.resize();
		this.drawBasis();
	}

	addMouseListeners() {
		this.canvas.addEventListener('mousedown', (event) => {
			this.mouseIsDown = true;
			this.lastMousePos.x = event.x;
			this.lastMousePos.y = event.y;
		});
		this.canvas.addEventListener('mouseup', () => {
			this.mouseIsDown = false;
		});
		this.canvas.addEventListener('mousemove', (event) => {
			if (!this.mouseIsDown) return;
			if (this.lastMousePos.x !== undefined && this.lastMousePos.y !== undefined) {
				let mDx = event.x - this.lastMousePos.x;
				let mDy = event.y - this.lastMousePos.y;
				this.shiftOrigin(mDx, mDy);
				this.drawBasis();
				this.updateAll();
			}
			this.lastMousePos.x = event.x;
			this.lastMousePos.y = event.y;
		});
	}

	resize(): void {
		this.canvas.setAttribute('width', window.getComputedStyle(this.canvas, null).getPropertyValue("width"));
		this.canvas.setAttribute('height', window.getComputedStyle(this.canvas, null).getPropertyValue("height"));
		this.origin = new Point(this.canvas.width/2, this.canvas.height/2);

		// for some reason, these values are reset inside this function, so set them back
		this.ctx.lineCap = 'round';
		this.ctx.lineJoin = 'round';
	}

	clearGrid() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	shiftOrigin(deltaX: number, deltaY: number) {
		this.origin.x += deltaX;
		this.origin.y += deltaY;
	}

	drawBasis(): void {
		// tick marks
		for (let position = this.origin.x + this.stepSize; position < this.canvas.width; position += this.stepSize) {
			this.ctx.lineWidth = 2;
			this.ctx.strokeStyle = '#eeeeee';
			this.ctx.beginPath();
			this.ctx.moveTo(position, 0);
			this.ctx.lineTo(position, this.canvas.height);
			this.ctx.stroke();
			this.ctx.closePath();
		}
		for (let position = this.origin.x - this.stepSize; position > 0; position -= this.stepSize) {
			this.ctx.lineWidth = 2;
			this.ctx.strokeStyle = '#eeeeee';
			this.ctx.beginPath();
			this.ctx.moveTo(position, 0);
			this.ctx.lineTo(position, this.canvas.height);
			this.ctx.stroke();
			this.ctx.closePath();
		}
		for (let position = this.origin.y + this.stepSize; position < this.canvas.height; position += this.stepSize) {
			this.ctx.lineWidth = 2;
			this.ctx.strokeStyle = '#eeeeee';
			this.ctx.beginPath();
			this.ctx.moveTo(0, position);
			this.ctx.lineTo(this.canvas.width, position);
			this.ctx.stroke();
			this.ctx.closePath();
		}
		for (let position = this.origin.y - this.stepSize; position > 0; position -= this.stepSize) {
			this.ctx.lineWidth = 2;
			this.ctx.strokeStyle = '#eeeeee';
			this.ctx.beginPath();
			this.ctx.moveTo(0, position);
			this.ctx.lineTo(this.canvas.width, position);
			this.ctx.stroke();
			this.ctx.closePath();
		}
		this.ctx.lineWidth = 2;
		this.ctx.fillStyle = '#c9c9c9';
		this.ctx.strokeStyle = '#c9c9c9';
		// the origin
		this.ctx.beginPath();
		this.ctx.arc(this.origin.x, this.origin.y, 5, 0, Math.PI * 2);
		this.ctx.fill();
		this.ctx.closePath();
		// y axis
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = '#c9c9c9';
		this.ctx.beginPath();
		this.ctx.moveTo(this.origin.x, 0);
		this.ctx.lineTo(this.origin.x, this.canvas.height);
		this.ctx.stroke();
		this.ctx.closePath();
		// x axis
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = '#c9c9c9';
		this.ctx.beginPath();
		this.ctx.moveTo(0, this.origin.y);
		this.ctx.lineTo(this.canvas.width, this.origin.y);
		this.ctx.stroke();
		this.ctx.closePath();
	}

	/**
	 * locate the actual coordinates of a point on the canvas, given a grid point
	 **/
	canvLocate(point: Point): Point {
		return new Point(
			this.origin.x + (this.stepSize * point.x) / this.stepRange,
			this.origin.y - (this.stepSize * point.y) / this.stepRange
		);
	}

	gridPoly(points: Point[], color: string): void {
		if (points.length === 0)
			return;
		this.ctx.fillStyle = hexToRGB(color, '0.5');
		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = 5;
		this.ctx.moveTo(points[0].x, points[0].y);
		this.ctx.beginPath();
		for (let point of points) {
			let pt = this.canvLocate(point);
			this.ctx.lineTo(pt.x, pt.y);
		}
		this.ctx.closePath();
		this.ctx.stroke();
		this.ctx.fill();
	}

	addRect(section_id: number, left: number, right: number, top: number, bottom: number, color: string): void {
		let points: Point[] = [];
		points.push(new Point(left, top));
		points.push(new Point(left, bottom));
		points.push(new Point(right, bottom));
		points.push(new Point(right, top));
		this.gridPoly(points, color);
	}

	addCirc(section_id: number, radius: number, center: Point, color: string) {
		/* console.log('in here'); */
		this.ctx.strokeStyle = color;
		this.ctx.fillStyle = hexToRGB(color, '0.5');
		this.ctx.lineWidth = 5;
		this.ctx.beginPath();
		let pt = this.canvLocate(center);
		this.ctx.arc(pt.x, pt.y, radius * this.stepSize, 0, Math.PI * 2);
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
	}

	addPoly(section_id: number, pts: number[], color: string) {
		let points: Point[] = [];
		for (let i = 0; i < pts.length; i+= 2) {
			points.push(new Point(pts[i], pts[i+1]));
		};
		this.gridPoly(points, color);
	}

	isValid(arr: number[]): boolean {
		// check for NaN
		for (let x of arr)
			if (Number.isNaN(x))
				return false;
		return true;
	}

	isValidRect(arr: number[]): boolean {
		return this.isValid(arr) && (arr.length === 4 || arr.length === 8);
	}

	isValidCirc(arr: number[]): boolean {
		return this.isValid(arr) && arr.length === 3;
	}

	isValidPoly(arr: number[]): boolean {
		return this.isValid(arr) && arr.length % 2 === 0;
	}

	updateAll(): void {
		this.clearGrid();
		this.drawBasis();
		const shapeList = document.getElementById('shapes') as HTMLUListElement;
		shapeList.childNodes.forEach((value, position) => {
			let shapeType = (value as Element).getElementsByTagName('select')[0].value;
			let numbers = (value as Element).getElementsByTagName('textarea')[0].value.trim().split(/ +/).map(x => +x);
			/* let color = hexToRGB(this.colors[position % this.colors.length], '0.5'); */
			let color = this.colors[position % this.colors.length];
			switch (shapeType) {
				case 'rectangle':
					if (this.isValidRect(numbers)) {
						this.addRect(position, numbers[0], numbers[1], numbers[2], numbers[3], color);
					}
					break;
				case 'circle':
					if (this.isValidCirc(numbers)) {
						this.addCirc(position, numbers[0], new Point(numbers[1], numbers[2]), color);
					}
					break;
				case 'polygon':
					if (this.isValidPoly(numbers)) {
						this.addPoly(position, numbers, color);
					}
					break;
				default:
					break;
			}
		});
	}
}

let app = new App();

const addShapeButton = document.getElementById('add');
const shapeList = document.getElementById('shapes') as HTMLUListElement;
const shapes = ['rectangle', 'circle', 'square', 'point', 'polygon'];

shapeList.addEventListener('input', (event) => {
	let target = (event.target as Element);
	if (target.tagName === 'TEXTAREA') {
		app.updateAll();
	}
});

// add new shapes
addShapeButton.addEventListener('click', () => {
	let li = document.createElement('li');
	let tx = document.createElement('textarea');
	let se = document.createElement('select');
	li.append(se);
	li.append(tx);
	shapeList.append(li);
	for (let shape of shapes) {
		let option = document.createElement('option');
		option.append(document.createTextNode(shape));
		se.append(option);
	}
});

window.addEventListener('resize', () => {
	app.resize();
	app.drawBasis();
	app.updateAll();
});

// vim: set fdm=syntax fdl=0: (fold subsections)
