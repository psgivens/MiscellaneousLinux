import * as d3 from 'd3'
import * as React from 'react';

export type OwnProps = {} & {
  guageId: string // Likely don't need the guageId
}
  
export type ConnectedState = {} & {
    counter?: number
}

export type ConnectedDispatch = {} & {

}

type OwnState = {} & {
  counter: number
}

type D3Config = {} & {
  [field:string]: any,
  size						: number,
  clipWidth					: number,
  clipHeight					: number,
  ringInset					: number,
  ringWidth					: number,

  pointerWidth				: number,
  pointerTailLength			: number,
  pointerHeadLengthPercent	: number,

  minValue					: number,
  maxValue					: number,

  minAngle					: number,
  maxAngle					: number,

  transitionMs				: number,

  majorTicks					: number,
  labelFormat					: (d:{valueOf():number}) => string,
  labelInset					: number,

  arcColorFn          : (d:any,i:number) => string
};



type ThisProps = ConnectedState & OwnProps & ConnectedDispatch
export class PomodoroGuageComponent extends React.Component<ThisProps, OwnState> {

  private node : SVGSVGElement
  private range:number
  private scale:d3.ScaleLinear<number,number>
  private counter:number = 0

  private config: D3Config = {          
    arcColorFn					: (d,i) => d3.interpolateHsl(d3.rgb('#F9E79F'), d3.rgb('#641E16'))(d*i),
    clipHeight					: 110,
    clipWidth					: 200,
    labelFormat					: d3.format('d'),
    labelInset					: 10,
    majorTicks					: 5,    
    maxAngle					: 90,
    maxValue					: 10,
    minAngle					: -90,
    minValue					: 0,
    pointerHeadLengthPercent	: 0.9,
    pointerTailLength			: 5,
    pointerWidth				: 10,
    ringInset					: 20,
    ringWidth					: 20,
    size						: 110,
    transitionMs				: 750,
  };

  constructor(props: ThisProps){
    super(props)
    this.createBarChart = this.createBarChart.bind(this)   
    this.config = this.config
    this.state = { counter: 0 }
  }

  public componentDidMount() {                                              
    const { counter, guageId }  = this.props
    this.createBarChart(guageId)
    this.updateBarChart(guageId, counter!)
  }

  public componentDidUpdate() { 
    const { counter, guageId }  = this.props

    this.updateBarChart(guageId, counter!)
  }

  public render() {                                                        
    const { guageId } = this.props
    return <div>
      <svg ref={node => this.node = node!} width={500} height={500} />
      Label: {guageId}
      </div>
  }

  private createBarChart(guageId: string) {

    // Parameters
    const r:number = 90

    // Calculation algorithms
    const centerTx = ():any => 'translate('+r +','+ r +')'    
    const deg2rad = (deg:number):number => deg * Math.PI / 180
    this.scale = d3.scaleLinear()
      .domain([this.config.minValue, this.config.maxValue])
      .range([0,1]);

    // Calculated factors
    this.range = this.config.maxAngle - this.config.minAngle;
    const pointerHeadLength = Math.round(r * this.config.pointerHeadLengthPercent);
    const tickData = d3.range(this.config.majorTicks).map(() => 1/this.config.majorTicks);
    const ticks = this.scale.ticks(this.config.majorTicks);

    // Arc creator
    const arc:any = d3.arc()
      .innerRadius(r - this.config.ringWidth - this.config.ringInset)
      .outerRadius(r - this.config.ringInset)
      .startAngle((d:any, i: number) => {
        const ratio = d * i;
        return deg2rad(this.config.minAngle + (ratio * this.range));
      })
      .endAngle((d:any, i:number) => {
        const ratio = d * (i+1);
        return deg2rad(this.config.minAngle + (ratio * this.range));
      });

    // Build the svg
    const svg = d3.select(this.node)
      .append('svg:svg')
      .attr('class', 'guage')
      .attr('width', this.config.clipWidth)
      .attr('height',this.config.clipHeight)

    // Graphic for the arcs
    const arcs = svg.append('g')
      .attr('class', 'arc')
      .attr('transform', centerTx)

    // Create the arc segments
    arcs.selectAll('path')
      .data(tickData)
      .enter()
      .append('path')
      .attr('fill', (d:any, i:number) => this.config.arcColorFn(d,i))
      .attr('d', arc);

    // Labels for the ticks
    const labelGraphic = svg.append('g')
      .attr('class', 'label')
      .attr('transform', centerTx)
    labelGraphic.selectAll('text')
      .data(ticks)
      .enter()
      .append('text')
      .attr('transform', (d:any) => {
        const ratio = this.scale(d);
        const newAngle = this.config.minAngle + (ratio * this.range);
        return 'rotate(' + newAngle +') translate(0,' + (this.config.labelInset - r) +')';
      })
      .text(d3.format('d'))

    const lineData = [ 
      [this.config.pointerWidth / 2, 0],
      [0, - pointerHeadLength],
      [-(this.config.pointerWidth / 2), 0],
      [0, this.config.pointerTailLength],
      [this.config.pointerWidth / 2, 0] ];
    const pointerLine = d3.line().curve(d3.curveLinear)

    const pointerGraphic = svg.append('g').data([lineData])
      .attr('class', 'pointer')
      .attr('transform', centerTx);    

    // Scope for ratio and newAngle
    {
      const ratio = this.scale(this.counter)
      const newAngle = this.config.minAngle + (ratio * this.range)

      pointerGraphic.append('path')
        .attr('d', pointerLine)
        .attr('transform', 'rotate(' + newAngle +')')
        .attr('id', 'pomodoro-guage-' + guageId)
    }
  }

  private updateBarChart(guageId:string, newValue:number){

    // Select the pointer created during chart creation.
    const pointer = d3.select('#pomodoro-guage-' + guageId)

    // Calculate the new angles
    const ratio = this.scale(newValue);
    const newAngle = this.config.minAngle + (ratio * this.range);

    // Update the pointer
    pointer.transition()
        .duration(this.config.transitionMs)
        // .ease(d3.easeElastic)
        .attr('transform', 'rotate(' + newAngle +')')
        .attr('old-value', newValue)

    // The counter is used so that we can transition from the last value.
    this.counter = newValue

    return 1
  }
}
