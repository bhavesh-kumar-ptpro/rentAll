import React from "react";
import ReactApexChart from "react-apexcharts";

class SalesSummeryChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [85, 60, 67, 50],
			options: {
				chart: {
					height: 330,
					type: "radialBar",
				},
				plotOptions: {
					radialBar: {
						startAngle:-160,
						endAngle: 160,
						dataLabels: {
							name: {
								fontSize: '22px',
							},
							value: {
								fontSize: '16px',
							},
						}
					},			
				},
				stroke:{
					lineCap: 'round',
				},
				labels: ['Income', 'Income', 'Income', 'Income'],
				colors:['#216FED', '#32D16D','#FF8723','#F43D3D'],
			},
		};
	}
	render() {
		return (
			<div id="chart" >
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="radialBar"
				  height={330}
				/>
			</div>
		);
	}
}

export default SalesSummeryChart;