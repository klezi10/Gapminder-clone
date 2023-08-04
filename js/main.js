const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 };
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

const svg = d3
	.select('#chart-area')
	.append('svg')
	.attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
	.attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

const g = svg
	.append('g')
	.attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

d3.json('data/data.json').then((data) => {
	const formattedData = data.map((data) =>
		data['countries']
			.filter((country) => {
				const availableData = country.income && country.life_exp;
				return availableData;
			})
			.map((data) => {
				// console.log(data);
				data.income = Number(data.income);
				data.life_exp = Number(data.life_exp);
				return data;
			})
	);

	const circles = d3.selectAll('circle').data(formattedData);

	circles
		.enter()
		.append('circle')
		.attr('fill', 'grey')
		.attr('cy', 0)
		.attr('r', 5);

	console.log(circles);
});
