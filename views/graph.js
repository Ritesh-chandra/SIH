const graph1= () => {
       
    Highcharts.chart('g1', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'TUBEWELLS CATEGORYWISE'
        },
        subtitle: {
            text: 'Source: SIH_DATA'
        },
        // colors: ['#2f7ed8','#910000','#8bbc21','#1aadce'],
    
        xAxis: {
            categories: [
                'CENSUS-1',
                'CENSUS-2'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'NUMBER OF WELLS'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}%</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        
    
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 1,
                // colorByPoint: true
            }
        },
        series: [{
            name: 'Census-1',
            color:'#003380',
            data: [49.9,50]
    
        }, {
            name: 'Census-2',
            color:'#3385ff',
            data: [83.6,90]
    
        }]
    });
    }
    
    
    // const graph2 = () => {
            
    // Highcharts.chart('container', {
    //     chart: {
    //         type: 'column'
    //     },
    //     title: {
    //         text: 'INCREASE IN TUBEWELLS'
    //     },
    //     subtitle: {
    //         text: 'Source: SIH_DATA'
    //     },
    //     // colors: ['#2f7ed8','#910000','#8bbc21','#1aadce'],
    
    //     xAxis: {
    //         categories: [
    //            'SHALLOW-TOTAL',
    //            'SHALLOW-INUSE',
    //            'DEEP-TOTAL',
    //            'DEEP-INUSE'
    //         ],
    //         crosshair: true
    //     },
    //     yAxis: {
    //         min: 0,
    //         title: {
    //             text: 'NUMBER OF TUBEWELLS'
    //         }
    //     },
    //     tooltip: {
    //         headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    //         pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    //             '<td style="padding:0"><b>{point.y:.1f}%</b></td></tr>',
    //         footerFormat: '</table>',
    //         shared: true,
    //         useHTML: true
    //     },
        
    
    //     plotOptions: {
    //         column: {
    //             pointPadding: 0.2,
    //             borderWidth: 1,
    //             // colorByPoint: true
    //         }
    //     },
    //     series: [{
    //         name: 'Census-1',
    //         color:'#003380',
    //         data: [49.9, 71.5,180,50]
    
    //     }, {
    //         name: 'Census-2',
    //         color:'#3385ff',
    //         data: [83.6, 78.8,80,50]
    
    //     }]
    // });
    // }
    // const graph3 = () => {
           
    // Highcharts.chart('container', {
    //     chart: {
    //         type: 'column'
    //     },
    //     title: {
    //         text: '% OF TUBEWELLS IN EACH CATEGORY'
    //     },
    //     subtitle: {
    //         text: 'Source: SIH_DATA'
    //     },
    //     // colors: ['#2f7ed8','#910000','#8bbc21','#1aadce'],
    
    //     xAxis: {
    //         categories: [
    //            'SHALLOW-TOTAL',
    //            'SHALLOW-INUSE',
    //            'DEEP-TOTAL',
    //            'DEEP-INUSE'
    //         ],
    //         crosshair: true
    //     },
    //     yAxis: {
    //         min: 0,
    //         title: {
    //             text: '% OF TUBEWELLS'
    //         }
    //     },
    //     tooltip: {
    //         headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    //         pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    //             '<td style="padding:0"><b>{point.y:.1f}%</b></td></tr>',
    //         footerFormat: '</table>',
    //         shared: true,
    //         useHTML: true
    //     },
        
    
    //     plotOptions: {
    //         column: {
    //             pointPadding: 0.2,
    //             borderWidth: 1,
    //             // colorByPoint: true
    //         }
    //     },
    //     series: [{
    //         name: 'Census-1',
    //         color:'#003380',
    //         data: [49.9, 71.5,80,50]
    
    //     }, {
    //         name: 'Census-2',
    //         color:'#3385ff',
    //         data: [83.6, 78.8,80,50]
    
    //     }]
    // });
    // }
    // const graph4= () => {
        
    // }