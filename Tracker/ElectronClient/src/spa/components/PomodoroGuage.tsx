import * as React from 'react';
import { connect } from 'react-redux';
// import './App.css'
import { scaleLinear } from 'd3-scale'                               
import { max } from 'd3-array'                                       
import { select } from 'd3-selection'                                
import * as state from '../reducers'
import * as redux from 'redux';
import { compose } from '../utils'

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

type ThisProps = ConnectedState & ConnectedDispatch & OwnProps
class BarChart extends React.Component<ThisProps, OwnState> {
  constructor(props: ThisProps){
    super(props)
    this.createBarChart = this.createBarChart.bind(this)             
  }

  node : SVGSVGElement

  componentDidMount() {                                              
    this.createBarChart()
  }

  componentDidUpdate() {                                             
    this.createBarChart()
  }

  createBarChart() {
    const node = this.node                                           
    // const dataMax = max(this.props.minutes)                             
    // const yScale = scaleLinear()
    //   .domain([0, dataMax])
    //   .range([0, this.props.size[1]])                                

    select(node)
        .append('rect')
        .attr('width', 100)
        .attr('height', 100)
        .style('fill', 'red')
        .style('stroke', 'black')
        
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