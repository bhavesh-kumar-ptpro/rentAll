import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexBarCharts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [{
			  name: 'Beverages   <span class="value">569</span>',
			  data: [30, 20, 30, 20, 20]
			}, {
			  name: 'Food  <span class="value"> 1,567</span>',
			  data: [40, 25, 40, 30, 25]
			}],
			options: {
				chart: {
					height: 230,
					type: "bar",
					toolbar: {
						show: false,
					},
					offsetX: -10,
				},
				plotOptions: {
					 bar: {
						horizontal: false,
						columnWidth: '55%',
						endingShape: 'rounded',
						startingShape: "rounded",
						borderRadius: 7,
					  },
					distributed: false				
				},
				grid: {	
					show: false
				},
				dataLabels: {
				  enabled: false
				},
				stroke: {
				  show: true,
				  width: 0,
				  colors: ['transparent'],
				  lineCap: 'smooth',
				},
				xaxis: {
				  categories: ['Week 01', 'Week 02', 'Week 03', 'Week 04', 'Week 05'],
				   labels: {
					show: true,
				   },
					 axisBorder:{
						   show: false,	
					 },
					 axisTicks: {
						show: false,
					},
				},
				yaxis: {
					show: true	,
					labels: {
					  show: true,
					  style: {
						  colors: [],
						  fontSize: '14px',
						  fontFamily: 'poppins',
						  fontWeight: 400,
						  cssClass: 'apexcharts-yaxis-label',
					  }
				  },
				},
				legend:{
					position: 'top',
					horizontalAlign: 'left', 
					fontWeight: 400,
					fontSize: '16px',
					fontFamily: 'poppins',
					itemMargin: {
					  horizontal: 15,
					  vertical: 5,
					  
					},
					 markers:{
						  radius: 12,
						  
					 },
				},
				fill: {
				  opacity: 1
				},
				colors: ['#38E25D','var(--primary)' ],
				tooltip: {
				  y: {
					formatter: function (val) {
					  return "$ " + val + " thousands"
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
				  type="bar"
				  height={230}
				/>
			</div>
		);
	}
}

export default ApexBarCharts;