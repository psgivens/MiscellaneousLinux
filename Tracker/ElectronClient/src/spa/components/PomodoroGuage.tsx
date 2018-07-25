import * as React from 'react';
import { connect } from 'react-redux';
// import './App.css'

import * as state from '../reducers'
import * as redux from 'redux';
import { compose } from '../utils'

// import { select } from 'd3-selection'                                
// import { format } from 'd3-format'
// import { scaleLinear } from 'd3-scale'                               
// import { max } from 'd3-array'                                       

import * as d3 from 'd3'
import { DefaultArcObject } from 'd3';

interface OwnProps {
    label: string
  }
  
type ConnectedState = {
    minutes: number
}

interface ConnectedDispatch {
}

interface OwnState {}

const mapStateToProps = (state: state.All, ownProps: OwnProps): ConnectedState => ({
    minutes: state.pomodoro.count
  })

const mapDispatchToProps = (dispatch: redux.Dispatch<state.All>): ConnectedDispatch => ({
  })  



	type D3Config = {
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
		labelFormat					: (number:{valueOf():number}) => string,
		labelInset					: number,

    arcColorFn          : (d:any,i:number) => string
		//arcColorFn					: (d,i) => d3.interpolateHsl(d3.rgb('#F9E79F'), d3.rgb('#641E16'))(d*i)
	};



type ThisProps = ConnectedState & ConnectedDispatch & OwnProps
class BarChart extends React.Component<ThisProps, OwnState> {
  // private pie:any
  // private colors:any

  constructor(props: ThisProps){
    super(props)
    this.createBarChart = this.createBarChart.bind(this)   
    
    // this.pie = d3.pie().value((d:any)=>d.value)
    // this.colors = d3.scale.category10();
  }

  node : SVGSVGElement

  componentDidMount() {                                              
    this.createBarChart()
  }

  componentDidUpdate() {                                             
    this.createBarChart()
  }



  private range:number = undefined;
  private r:number = undefined;
  private pointerHeadLength:number = undefined;
  private value:number = 0;
  private svg:any = undefined;
  private arc:d3.Arc<any, DefaultArcObject> = undefined;
  private scale:d3.ScaleLinear<number,number> = undefined;
  private ticks:number[] = undefined;
  private tickData:any = undefined;
  private pointer:any = undefined;
    
  private colors = ["#16A085", "#76D7C4", "#F7DC6F", "#F1C40F", "#A93226"];

  private config: D3Config = {      
    size						: 110,
    clipWidth					: 200,
    clipHeight					: 110,
    ringInset					: 20,
    ringWidth					: 20,

    pointerWidth				: 10,
    pointerTailLength			: 5,
    pointerHeadLengthPercent	: 0.9,

    minValue					: 0,
    maxValue					: 10,

    minAngle					: -90,
    maxAngle					: 90,

    transitionMs				: 750,

    majorTicks					: 5,
    labelFormat					: d3.format('d'),
    labelInset					: 10,

    arcColorFn          : (d:any,i:number) => this.colors[i] //#F9EBEA
    //arcColorFn					: (d,i) => d3.interpolateHsl(d3.rgb('#F9E79F'), d3.rgb('#641E16'))(d*i)
  };


  private configure(configuration: D3Config) {
    var prop:string = undefined;
    Object.keys(configuration).forEach((prop)=>{
      this.config[prop] = configuration[prop];
    })
  
    this.range = this.config.maxAngle - this.config.minAngle;
    this.r = this.config.size / 2;
    this.pointerHeadLength = Math.round(this.r * this.config.pointerHeadLengthPercent);
  
    // a linear scale that maps domain values to a percent from 0..1
    this.scale = d3.scaleLinear()
      .domain([this.config.minValue, this.config.maxValue])
      .range([0,1]);
  

    // ticks = scale.ticks(config.majorTicks);
    this.ticks = this.scale.ticks(0);
    this.tickData = d3.range(this.config.majorTicks).map(function() {return 1/this.config.majorTicks;});

    this.arc = d3.arc()
      .innerRadius(this.r - this.config.ringWidth - this.config.ringInset)
      .outerRadius(this.r - this.config.ringInset)
      .startAngle(function(d:any, i) {
        var ratio = d * i;
        return this.deg2rad(this.config.minAngle + (ratio * this.range));
      })
      .endAngle(function(d:any, i) {
        var ratio = d * (i+1);
        return this.deg2rad(this.config.minAngle + (ratio * this.range));
      });
  }

  private update(newValue:number, newConfiguration:D3Config):void {
    if ( newConfiguration  !== undefined) {
      this.configure(newConfiguration);
    }
    var ratio = this.scale(newValue);
    var newAngle = this.config.minAngle + (ratio * this.range);
    this.pointer.transition()
      .duration(this.config.transitionMs)
      .ease(d3.easeElastic)
      .attr('transform', 'rotate(' +newAngle +')');
  }
  


  createBarChart() {

    let that: { 
      configure: (config:D3Config) => void
      isRendered: () => boolean
      update: (newValue: any, newConfiguration: D3Config) => void
      render: (newValue: any) => void
    } 

    // var donut = d3.pie();
  
    const deg2rad = (deg:number):number => deg * Math.PI / 180
    const newAngle = (d:number): number => {
      var ratio = this.scale(d);
      var newAngle = this.config.minAngle + (ratio * this.range);
      return newAngle;
    }
    const centerTranslation = ():any =>  'translate('+this.r +','+ this.r +')'
    const isRendered = ():boolean => this.svg !== undefined

    const renderSvg = (newValue:number):void => {
      // d3.select(this.node)
      // .append('rect')
      // .attr('width', 100)
      // .attr('height', 100)
      // .style('fill', 'red')
      // .style('stroke', 'black')
    
      this.svg = d3.select(this.node)
        .append('svg:svg')
          .attr('class', 'gauge')
          .attr('width', this.config.clipWidth)
          .attr('height', this.config.clipHeight);

      var centerTx = centerTranslation();

      var arcs = this.svg.append('g')
          .attr('class', 'arc')
          .attr('transform', 40)//centerTx);

      arcs.selectAll('path')
          .data(this.tickData)
          .enter()
          .append('path')
          .attr('fill', function(d:any, i:number) {
            return this.config.arcColorFn(d,i);
          })
          .attr('d', this.arc);

      var lg = this.svg.append('g')
          .attr('class', 'label')
          .attr('transform', centerTx);

      lg.selectAll('text')
          .data(this.ticks)
        .enter().append('text')
          .attr('transform', function(d:any) {
            var ratio = this.scale(d);
            var newAngle = this.config.minAngle + (ratio * this.range);
            return 'rotate(' +newAngle +') translate(0,' +(this.config.labelInset - this.r) +')';
          })
          .text(this.config.labelFormat);

      var lineData = [ [this.config.pointerWidth / 2, 0],
              [0, -this.pointerHeadLength],
              [-(this.config.pointerWidth / 2), 0],
              [0, this.config.pointerTailLength],
              [this.config.pointerWidth / 2, 0] ];
      var pointerLine = d3.line().curve(d3.curveLinear)
      var pg = this.svg.append('g').data([lineData])
          .attr('class', 'pointer')
          .attr('transform', centerTx);

          this.pointer = pg.append('path')
        .attr('d', pointerLine/*function(d) { return pointerLine(d) +'Z';}*/ )
        .attr('transform', 'rotate(' +this.config.minAngle +')');

        this.update(newValue === undefined ? 0 : newValue, this.config);
    }
    // that.render = render;

    //configure(config)
    
    //that.render(7)

    const x=10
    console.log(x +"*****************")
    console.log(x +"*****************")
    console.log(x +"*****************")
    console.log(x +"*****************")
    console.log(x +"*****************")
    
    let xScale = d3.scaleTime().range([0, 500]);

    renderSvg (7)















    // const dataMax = max(this.props.minutes)                             
    // const yScale = scaleLinear()
    //   .domain([0, dataMax])
    //   .range([0, this.props.size[1]])                                
        
    //   .selectAll("rect")
    //   .data(this.props.data)
    //   .enter()
    //   .append("rect")

    // select(node)
    //   .selectAll("rect")
    //   .data(this.props.data)
    //   .exit()
    //   .remove()

    // select(node)
    //   .selectAll("rect")
    //   .data(this.props.data)
    //   .style("fill", "#fe9922")
    //   .attr("x", (d,i) => i * 25)
    //   .attr("y", d => this.props.size[1] - yScale(d))
    //   .attr("height", d => yScale(d))
    //   .attr("width", 25)
  }

  render() {                                                        
    return <svg ref={node => this.node = node}                      
            width={500} height={500}>
    </svg>
  }
}

export const PomodoroGuage = compose(
  BarChart,
  // loadable(isLoading),
  connect(mapStateToProps, mapDispatchToProps),
)
//export PomodoroGuage