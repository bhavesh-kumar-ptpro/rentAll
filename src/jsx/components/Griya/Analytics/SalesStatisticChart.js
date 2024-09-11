import React from "react";
import ReactApexChart from "react-apexcharts";

class SalesStatisticChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [
				{
					name: 'Net Profit',
					data: [500,800, 400, 700, 500, 800, 300, 600,900,600,1000],
					//radius: 12,	
				}, 				
			],
			options: {
				chart: {
					height: 300,
					type: "line",
					toolbar: {
						show: false,
					},
				},
				
				colors:['#216FED'],
				dataLabels: {
				  enabled: false,
				},

				legend: {
					show: false,
				},
				stroke: {
				  show: true,
				  width: 8,
				  curve:'smooth',
				  colors:['#216FED'],
				},
				
				grid: {
					show:true,
					borderColor: '#AFAFAF',
					strokeDashArray: 5,
					padding: {
						top: 0,
						right: 0,
						bottom: 0,
						left: 0

					}
				},
				states: {
					normal: {
						filter: {
							type: 'none',
							value: 0
						}
					},
					hover: {
						filter: {
							type: 'none',
							value: 0
						}
					},
					active: {
						allowMultipleDataPointsSelection: false,
						filter: {
							type: 'none',
							value: 0
						}
					}
				},
				xaxis: {
					//categories: ['Jan', 'feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov'],
					axisBorder: {
						show: true,
					},
					axisTicks: {
						show: false
					},
					labels: {
						style: {
							fontSize: '12px',
						}
					},
					crosshairs: {
						show: false,
						position: 'front',
						stroke: {
							width: 1,
							dashArray: 3
						}
					},
					tooltip: {
						enabled: true,
						formatter: undefined,
						offsetY: 0,
						style: {
							fontSize: '12px',
						}
					}
				},
				yaxis: {
					show: true,
					labels:{
						offsetX:-20,
					}
				},
				fill: {
				  opacity: 1,
				  colors:'#FB3E7A'
				},
				tooltip: {
					style: {
						fontSize: '12px',
					},
					y: {
						formatter: function(val) {
							return "$" + val + " thousands"
						}
					}
				}
			},
		};
	}

	render() {
		return (
			<div id="chart" >
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="line"
				  height={300}
				/>
			</div>
		);
	}
}

export default SalesStatisticChart;