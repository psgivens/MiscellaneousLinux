// import * as d3 from 'd3'
// import { DefaultArcObject } from 'd3';

import * as React from 'react';
import { connect } from 'react-redux';
// import './App.css'

import * as redux from 'redux';
import * as state from './reducers'
import { compose } from './utils'

// import { select } from 'd3-selection'                                
// import { format } from 'd3-format'
// import { scaleLinear } from 'd3-scale'                               
// import { max } from 'd3-array'                                       

interface IOwnProps {
    label: string
  }
  
interface IConnectedState {
    counter: number
}

interface IConnectedDispatch {
  fake: any
}
interface IOwnState {
  fake: any
}

type GuageAction = {
  type: 'NEW_COUNT'
} | {
  type: 'OTHER_ACTION'
}

const mapStateToProps = (state1: state.IAll, ownProps: IOwnProps): IConnectedState => ({
    counter: state1.counter
  })

const mapDispatchToProps = (dispatch: redux.Dispatch<GuageAction>): IConnectedDispatch => ({
  fake: 4
  })  

	interface ID3Config {
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
		// labelFormat					: (d:{valueOf():number}) => string,
		labelInset					: number,

    arcColorFn          : (d:any,i:number) => string
		// arcColorFn					: (d,i) => d3.interpolateHsl(d3.rgb('#F9E79F'), d3.rgb('#641E16'))(d*i)
	};



type ThisProps = IConnectedState & IConnectedDispatch & IOwnProps
class BarChart extends React.Component<ThisProps, IOwnState> {

  private node : SVGSVGElement
  // private range:number
  // private r:number
  // private pointerHeadLength:number
  // private svg:any
  // private arc:d3.Arc<any, DefaultArcObject>
  // private scale:d3.ScaleLinear<number,number>
  // private ticks:number[] = []
  // private tickData:any
  // private pointer:any
  // // private value:number
  
  private colors = ["#16A085", "#76D7C4", "#F7DC6F", "#F1C40F", "#A93226"];

  private config: ID3Config = {          
    arcColorFn          : (d:any,i:number) => this.colors[i], // #F9EBEA
    // arcColorFn					: (d,i) => d3.interpolateHsl(d3.rgb('#F9E79F'), d3.rgb('#641E16'))(d*i)
    clipHeight					: 110,
    clipWidth					: 200,
    // labelFormat					: d3.format('d'),
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
  }

  public componentDidMount() {                                              
    this.createBarChart()
  }

  public componentDidUpdate() {                                             
    this.createBarChart()
  }

  public createBarChart() {
    return 1
  }

  public render() {                                                        
    return <svg ref={node => this.node = node!} width={500} height={500} />
  }

}

export const PomodoroGuage = compose(
  BarChart,
  connect(mapStateToProps, mapDispatchToProps),

)