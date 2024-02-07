export default class ColumnChart {
    chartHeight = 50;

    constructor({
        data = [], 
        label = '', 
        value = 0, 
        link = '', 
        formatHeading = value => value
    } = {}){
        this.data = data;
        this.label = label;
        this.value = value;
        this.link = link;
        this.formatHeading = formatHeading;
        this.element = this.render();
    }

    getColumnProps() {
        const maxValue = Math.max(...this.data);
        const scale = 50 / maxValue;
      
        return this.data.map(item => {
          return {
            percent: (item / maxValue * 100).toFixed(0) + '%',
            value: String(Math.floor(item * scale))
          };
        });
    }

    createChartBodyTemplate() {
        return(
            this.getColumnProps().map(({value, percent}) => `<div style="--value: ${value}" data-tooltip=${percent}></div>`).join("")
        )
    }

    render(){
        const container = document.createElement("div");

        container.innerHTML = `
            <div class='column-chart ${!this.data.length && 'column-chart_loading'}'>
                <div class="column-chart__title">
                    Total ${this.label}
                    ${!this.data.length ? `<a class="column-chart__link" href="${this.link}">View all</a>` : ''}
                </div>
                <div class="column-chart__container">
                    <div data-element="header" class="column-chart__header">
                        ${this.formatHeading ? this.formatHeading(this.value) : this.value}
                    </div>
                    <div data-element="body" class="column-chart__chart">
                        ${this.createChartBodyTemplate()}
                    </div>
                </div>
            </div>
        `;

        return container.firstElementChild;
    }

    remove() {
        this.element.remove();
    }

    destroy(){
        this.remove();
    }

    update(newDataArray){
        this.data = newDataArray;
        this.element.querySelector('[data-element="body"]').innerHTML = this.createChartBodyTemplate();
    }
}
