
import * as d3 from 'd3'
import * as React from 'react';
import { connect } from 'react-redux';

import * as container from './PomodoroArcConnect'

type ComponentState = {} & {
  counter: number
}

type D3Config = {} & {
  [field:string]    : any
  name              : string
  clipWidth         : number
  clipHeight        : number
  transitionMs			: number

};



type ThisProps = container.StateProps & container.AttributeProps & container.ConnectedDispatch
class PomodoroArcComponent extends React.Component<ThisProps, ComponentState> {

  private node : SVGSVGElement
  private seed:number

  private config: D3Config = {
    clipHeight: 200,
    clipWidth: 200,
    name: "whatever",
    transitionMs : 750,       
  };

  constructor(props: ThisProps){
    super(props)
    this.createChart = this.createChart.bind(this)   
    this.config = this.config
    this.state = { counter: 0 }
    this.seed = Math.floor(Math.random() * 1000)
  }

  public componentDidMount() {                                              
    const { counter, guageId }  = this.props
    this.createChart(guageId)
    this.updateChart(guageId, counter!)
  }

  public componentDidUpdate() { 
    const { counter, guageId }  = this.props

    this.updateChart(guageId, counter!)
  }

  public render() {                                                        
    return <div>
      <svg ref={node => this.node = node!} width={200} height={200} />
      </div>
  }

  private createChart(guageId: string) {

    const g = d3.select(this.node)
      .append("svg")
      .attr("width", this.config.clipWidth)
      .attr("height", this.config.clipHeight)
      .append("g")
      .attr("transform", "translate(100,100)");

    const arc1 = d3.arc()
      .innerRadius(50)
      .outerRadius(70)
      .startAngle(0)
      .endAngle(0.5 * Math.PI);
  
    g.append("path")
      .attr("class", "arc")
      .attr("id", "pomodoro-arc-" + guageId + '' + this.seed)
      .attr("d", arc1);                  
  }

  private updateChart(guageId:string, newValue:number){

    const g2 = d3.select("#pomodoro-arc-" + guageId + '' + this.seed)
    const value = newValue / 5
    const arc2 = d3.arc()
      .innerRadius(50)
      .outerRadius(70)
      .startAngle(0)
      .endAngle(value * Math.PI);
      
    g2.transition()
        .duration(this.config.transitionMs)
        .attr("d", arc2);

    return 1
  }
}

export const PomodoroArc = 
  connect<{}, {}, container.AttributeProps>(container.mapStateToProps, container.mapDispatchToProps) (PomodoroArcComponent)
