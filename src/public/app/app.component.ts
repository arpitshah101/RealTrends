import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

import { ArticleDataService } from './article-data.service';

declare let $: any;
declare let Highcharts: any;

function getTop10Categories(responseData: any[]) {
    return responseData.sort((a, b) => b.count - a.count).slice(0, 6);
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        ArticleDataService
    ]
})
export class AppComponent implements OnInit {

    private categoryData: any[];
    private topCategories: any[] = [];
    
    constructor(public activatedRouter: ActivatedRoute, public router: Router, public articleData: ArticleDataService) { }
    
    ngOnInit() {
        this.getInitData().then(data => {
            this.generateChart();
        });
    }
    
    getInitData() {
        return new Promise((resolve, reject) => {
            this.articleData.getCategoryCounts()
            .subscribe((data: any) => {
                this.categoryData = data;
                this.categoryData = this.categoryData.map(category => {
                    const result = {};
                    result['name'] = category.category;
                    result['id'] = category.category;
                    result['data'] = [[category.date, category.count]];
                    return result;
                });
                resolve();
            },
            (err) => {
                reject(err);
            });
        });
        
    }
    
    generateChart() {
        const articleData = this.articleData;
        const initData = this.categoryData;
        const topCategories = this.topCategories;
        
        // Create the chart
        const chart = Highcharts.stockChart('chart-container', {
            chart: {
                events: {
                    load: function () {
                        
                        // set up the updating of the chart each second
                        var series: any[] = this.series;
                        setInterval(function () {
                            articleData.getCategoryCounts().subscribe(
                                (data: any[]) => {
                                    const topCats = getTop10Categories(data);
                                    data.forEach((category) => {
                                        if (topCats.indexOf(category) > -1) {
                                            const filteredSeries = series.filter((cat) => cat.name == category.category);
                                            if (filteredSeries.length == 0) {
                                                // add new series
                                                chart.addSeries({
                                                    name: category.category,
                                                    id: category.category,
                                                    data: [[category.date, category.count]]
                                                }, true, true);
                                            } else {
                                                filteredSeries[0].addPoint([category.date, category.count]);
                                            }    
                                        } else {
                                            let x = chart.get(category.category);
                                            if (x) {
                                                x.remove();
                                            }
                                        }
                                    });

                                    console.log(data);
                                }
                                );
                            }, 500);
                        }
                    }
                },
                
                time: {
                    useUTC: false
                },
                
                rangeSelector: {
                    buttons: [{
                        count: 1,
                        type: 'minute',
                        text: '1M'
                    }, {
                        count: 5,
                        type: 'minute',
                        text: '5M'
                    }, {
                        type: 'all',
                        text: 'All'
                    }],
                    inputEnabled: false,
                    selected: 2
                },
                
                title: {
                    text: 'Live Category Counts'
                },
                
                exporting: {
                    enabled: false
                },
                
                series: initData
                });

        this.topCategories = chart.series;
                
                
            }
        }
        