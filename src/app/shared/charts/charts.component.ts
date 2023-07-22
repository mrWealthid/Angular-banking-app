import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexNoData,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
  ChartComponent
} from "ng-apexcharts";
import {IDashboardData} from "../../dashboard/dashboard.model";
import {ChartType} from "ng-apexcharts/lib/model/apex-types";


export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  title: ApexTitleSubtitle | any;
  stroke: ApexStroke | any
  fill: ApexFill | any
  datalabels: ApexDataLabels | any
  toolbar: any,
  noData: ApexNoData | any,
  plotOptions: ApexPlotOptions | any;
  colors: any,
  type: ChartType,

};

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent implements OnInit, AfterViewInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  @Input({required: true}) series: IDashboardData[]
  @Input() type: ChartType = 'bar'

  @Input() xTitle: string = 'Years'
  @Input() yTitle: string = 'Time'
  @Input() colors = ['#22C55E', '#DC2626']

  constructor() {

    this.chartOptions = {

      colors: this.colors,
      type: this.type,

      datalabels: {
        enabled: false,
      },


      noData: {
        text: 'No Data Available...'
      },
      chart: {
        sparkline: {
          enabled: false
        },

        foreColor: 'black',


        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 5,
          tools: {
            show: true,
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },


        height: 350,
        // type: "area",
        fontFamily: "Raleway, Arial, sans-serif",
        legend: {

          position: "top",
          offsetY: 5,
          horizontalAlign: "left",
        },

        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "90%",
            endingShape: "rounded"
          }
        }, xaxis: {
          title: {
            text: this.xTitle,
            offsetX: 0,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: "15px",
              fontWeight: 600,
              cssClass: "apexcharts-xaxis-title",
            },
          },


          tickPlacement: "off",
          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm",
            },
          },
        },
        yaxis: {
          title: {
            text: this.yTitle,
            style: {
              color: undefined,
              fontSize: "15px",
              fontWeight: 600,
              cssClass: "apexcharts-xaxis-title",
            },
          },
          crosshairs: {
            show: true,
            position: "back",
            stroke: {
              color: "#b6b6b6",
              width: 1,
              dashArray: 0,
            },
          },
          tooltip: {
            enabled: true,
            offsetX: 0,
          },
        },


      },
      stroke: {
        curve: "smooth",
        show: true,
        //   lineCap: 'butt',
        //   colors: undefined,
        width: 1,
        dashArray: 1,
      },


      fill: {
        colors: undefined,
        opacity: 0,
        type: "solid",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 100],
          colorStops: [],
        },
      },

    };
  }


  ngOnInit() {

    this.chartOptions.chart.type = this.type
    // this.chartOptions.xaxis.title.text = this.xTitle
    // this.chartOptions.yaxis.title.text = this.yTitle

    // console.log(this.series)
    this.chartOptions.series = this.series

    // this.chartOptions.xaxis.type = 'category',
    //   this.chartOptions.xaxis.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    // console.log(this.xTitle)
    // console.log(this.yTitle)
    // console.log(this.series)

    console.log(this.chartOptions.xaxis)
    // this.chartOptions.xaxis.type = this.xTitle
    // this.chartOptions.series = this.series
  }


  ngAfterViewInit() {
    console.log(this.type)

    console.log(this.series);
    // this.chart.series = [{
    //   name: "debit", data: [
    //     {
    //       x: "Jun", y: 2000
    //     }, {
    //       x: "Jun", y: 3000
    //     }, {
    //       x: "Jul", y: 5000
    //     }, {
    //       x: "Aug", y: 9000
    //     }, {
    //       x: "Sep", y: 9000
    //     }
    //   ]
    // }
    //]


    // this.chart.series = [{
    //   name: 'Debit',
    //   data:
    //     [
    //       {
    //         "x": "Jan",
    //         "y": 322
    //       },
    //       {
    //         "x": "Feb",
    //         "y": 324
    //       },
    //       {
    //         "x": "Mar",
    //         "y": 329
    //       },
    //       {
    //         "x": "Apr",
    //         "y": 342
    //       },
    //       {
    //         "x": "May",
    //         "y": 348
    //       },
    //       {
    //         "x": "Jun",
    //         "y": 334
    //       },
    //       {
    //         "x": "Jul",
    //         "y": 325
    //       },
    //       {
    //         "x": "Aug",
    //         "y": 316
    //       },
    //       {
    //         "x": "Sep",
    //         "y": 318
    //       },
    //       {
    //         "x": "Oct",
    //         "y": 330
    //       },
    //       {
    //         "x": "Nov",
    //         "y": 355
    //       },
    //       {
    //         "x": "Dec",
    //         "y": 366
    //       },
    //
    //     ]
    //
    // }]
    // {
    //     name: 'Credit', data: [
    //       {
    //         "x": "Jan",
    //         "y": 922
    //       },
    //       {
    //         "x": "Feb",
    //         "y": 524
    //       },
    //       {
    //         "x": "Mar",
    //         "y": 429
    //       },
    //       {
    //         "x": "Apr",
    //         "y": 400
    //       },
    //       {
    //         "x": "May",
    //         "y": 329
    //       },
    //       {
    //         "x": "Jun",
    //         "y": 384
    //       },
    //       {
    //         "x": "Jul",
    //         "y": 385
    //       },
    //       {
    //         "x": "Aug",
    //         "y": 716
    //       },
    //       {
    //         "x": "Sep",
    //         "y": 418
    //       },
    //       {
    //         "x": "Oct",
    //         "y": 335
    //       },
    //       {
    //         "x": "Nov",
    //         "y": 354
    //       },
    //       {
    //         "x": "Dec",
    //         "y": 306
    //       },
    //
    //     ]
    //
    //
    //   },]

  }
}
