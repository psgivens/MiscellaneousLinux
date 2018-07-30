import * as d3 from 'd3'
import * as React from 'react';
import { connect } from 'react-redux';
import * as redux from 'redux';
import * as state from './reducers'
import { compose } from './utils'

type OwnProps = {} & {
  label: string,
  counter: number
}
  
type ConnectedState = {} & {
    counter: number
}

type ConnectedDispatch = {} & {
  fake: any
}

type OwnState = {} & {
  counter: number
}

type GuageAction = {
  type: 'NEW_COUNT'
} | {
  type: 'OTHER_ACTION'
}

const mapStateToProps = (state1: state.IAll, ownProps: OwnProps): ConnectedState => ({
  counter: state1.counter
})

const mapDispatchToProps = (dispatch: redux.Dispatch<GuageAction>): ConnectedDispatch => ({
  fake: 4
  })  

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



type ThisProps = ConnectedState & ConnectedDispatch & OwnProps
class BarChart extends React.Component<ThisProps, OwnState> {

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
    this.createBarChart()
    const { counter }  = this.props
    this.updateBarChart(counter)
  }

  public componentDidUpdate() { 
    const { counter }  = this.props
    // this.createBarChart()
    this.updateBarChart(counter)
  }

  public render() {                                                        
    return <svg ref={node => this.node = node!} width={500} height={500} />
  }

  private createBarChart() {

    // Parameters
    const r:number = 90

    // Calculation algorithms
    const centerTx = ():any => 'translate('+r +','+ r +')'    
    const deg2rad = (deg:number):number => deg * Math.PI / 180

    // Calculated factors
    this.range = this.config.maxAngle - this.config.minAngle;
    const pointerHeadLength = Math.round(r * this.config.pointerHeadLengthPercent);
    const tickData = d3.range(this.config.majorTicks).map(() => 1/this.config.majorTicks);

    this.scale = d3.scaleLinear()
      .domain([this.config.minValue, this.config.maxValue])
      .range([0,1]);

    const ticks = this.scale.ticks(this.config.majorTicks);

    const svg = d3.select(this.node)
      .append('svg:svg')
      .attr('class', 'guage')
      .attr('width', this.config.clipWidth)
      .attr('height',this.config.clipHeight)

    const arcs = svg.append('g')
      .attr('class', 'arc')
      .attr('transform', centerTx)

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

    arcs.selectAll('path')
      .data(tickData)
      .enter()
      .append('path')
      .attr('fill', (d:any, i:number) => this.config.arcColorFn(d,i))
      .attr('d', arc);

    const lg = svg.append('g')
      .attr('class', 'label')
      .attr('transform', centerTx)

    lg.selectAll('text')
      .data(ticks)
      .enter()
      .append('text')
      .attr('transform', (d:any) => {
        const ratio = this.scale(d);
        const newAngle = this.config.minAngle + (ratio * this.range);
        return 'rotate(' +newAngle +') translate(0,' +(this.config.labelInset - r) +')';
      })
      .text(d3.format('d'))

      const lineData = [ [this.config.pointerWidth / 2, 0],
              [0, - pointerHeadLength],
              [-(this.config.pointerWidth / 2), 0],
              [0, this.config.pointerTailLength],
              [this.config.pointerWidth / 2, 0] ];
      const pointerLine = d3.line().curve(d3.curveLinear)

      const pg = svg.append('g').data([lineData])
          .attr('class', 'pointer')
          .attr('transform', centerTx);    

      const ratio2 = this.scale(this.counter)
      const newAngle2 = this.config.minAngle + (ratio2 * this.range)

      pg.append('path')
        .attr('d', pointerLine)
        .attr('transform', 'rotate(' + newAngle2 +')')
        .attr('id', 'pointer-x')
    }

     private updateBarChart(newValue:number){
      const pointer = d3.select('#pointer-x')
      // Update the pointer
      const ratio1 = this.scale(newValue);
      const newAngle1 = this.config.minAngle + (ratio1 * this.range);
      pointer.transition()
          .duration(this.config.transitionMs)
          // .ease(d3.easeElastic)
          .attr('transform', 'rotate(' + newAngle1 +')')
          .attr('old-value', newValue)

      this.counter = newValue

    return 1
  }
}

export const PomodoroGuage = compose(
  BarChart,
  connect(mapStateToProps, mapDispatchToProps),

)