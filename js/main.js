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

const x = d3.scaleLog().domain([100, 15000]).range([0, WIDTH]).base(2);

const y = d3.scaleLinear().domain([0, 90]).range([HEIGHT, 0]);

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

	x.domain(data.map((d) => d.income));

	y.domain([0, d3.max(data, (d) => d[d.life_exp])]);

	const xAxisCall = d3.axisBottom(x).tickValues(d3.range(400, 4000, 40000));

	const yAxisCall = d3.axisLeft(y);

	g.append('text')
		.attr('class', 'x axis-label')
		.attr('x', WIDTH / 2)
		.attr('y', HEIGHT + 80)
		.attr('font-size', '20px')
		.attr('text-anchor', 'middle')
		.text('GDP per capita');

	g.append('text')
		.attr('class', 'y axis-label')
		.attr('x', -HEIGHT / 2)
		.attr('y', -80)
		.attr('font-size', '20px')
		.attr('text-anchor', 'middle')
		.attr('transform', 'rotate(-90)');

	const circles = d3.selectAll('circle').data(formattedData);

	circles
		.enter()
		.append('circle')
		.attr('fill', 'grey')
		.attr('cy', 0)
		.attr('r', 5);
});
