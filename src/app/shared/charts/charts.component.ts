import {Component, ViewChild} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLocale,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  title: ApexTitleSubtitle | any;
  stroke: ApexStroke | any
  fill: ApexFill | any
  datalabels: ApexDataLabels | any
  toolbar: ApexLocale | any

};

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      datalabels: {
        enabled: false,
      },
      // colors: ["pink", "yellow", "green", "blue", "black"],
      toolbar: {
        show: false,
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
          // reset: true| '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
        },
      },

      series: [
        {
          name: "Debit",
          data: [1, 42, 21, 54, 45, 111, 100, 210],
        },
        {
          name: "Credit",
          data: [22, 73, 88, 89, 42, 96, 100, 300],
        },
        // {
        //   name: "Tours",
        //   data: [33, 40, 22, 33, 47, 188, 10, 150],
        // },
        // {
        //   name: "Restaurant",
        //   data: [31, 40, 28, 51, 42, 109, 100, 200],
        // },
        // {
        //   name: "Photography",
        //   data: [11, 32, 45, 32, 34, 52, 41, 250],
        // },
        // {
        //   name: "Workstation",
        //   data: [5, 8, 43, 35, 39, 54, 41, 280],
        //
        // },
      ],

      chart: {

        sparkline: {
          enabled: false
        },

        height: 350,
        type: "area",
        fontFamily: "Raleway, Arial, sans-serif",


        legend: {
          position: "top",
          offsetY: 5,
          horizontalAlign: "left",
        },

        xaxis: {
          title: {
            text: "Time(Years)",
            offsetX: 0,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: "15px",

              fontWeight: 600,
              cssClass: "apexcharts-xaxis-title",
            },
          },
          type: "category",

          categories: [
            2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012,
            2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
          ],

          tickPlacement: "off",
          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm",
            },
          },
        },
        yaxis: {
          title: {
            text: "Amount",

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
        // show: true,
        //   lineCap: 'butt',
        //   colors: undefined,
        width: 1,
        dashArray: 0,
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


}
