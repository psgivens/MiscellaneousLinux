// This component handles the App template used on every page.
import * as React from 'react';
import { connect } from 'react-redux';

import Button from '../common/Button'

import * as container from './ListDemoConnect'

import { createPomodoro } from '../data/PomodoroData'

import TextInput from '../common/TextInput'

// import { PomodoroIdb } from '../data/PomodoroData'

type ThisProps = container.StateProps & container.ConnectedDispatch & container.AttributeProps

type ComponentState = {} & {
  actual: string
  planned: string
}

class PureListDemo extends React.Component<ThisProps, ComponentState> {

  constructor (props:ThisProps) {
    super (props)
    this.state = {
      actual: "b: Actually posted from UI",
      planned: "b: Planned posted from UI"
    }
    this.onActualChange = this.onActualChange.bind(this)
    this.onPlannedChange = this.onPlannedChange.bind(this)
    this.onClick = this.onClick.bind(this)

    this.props.loadItems!()
  }

  public render () {
    return (<div className="container-fluid" >
      
      <section className="section">
        <div className="container">
          <h1 className="title"> 
              Pomodoro List Example
          </h1>
          <p className="subtitle">
              This is an example of adding and listing items!
          </p>
          <div>
          <TextInput
            inputType="text"
            label="Actual Value"            
            name="actual"
            placeholder="Enter what actually was worked on"
            value={this.state.actual}
            onChange={this.onActualChange} />
          <TextInput
            inputType="text"
            label="Planned Value"            
            name="planned"
            placeholder="Enter what you planned to work on"
            value={this.state.planned}
            onChange={this.onPlannedChange} />
            <Button onClick={this.onClick} text="Add Item" />

            <br />
            <hr />
            <br />
            <table className="table">
              <thead>
                <tr>
                  <th>Planned</th>
                  <th>Actual</th>
                  <th>Start</th>
                </tr>
              </thead>
              <tbody>
              {/* {this.props.pomodoros.map((pomodoro:PomodoroIdb)=>
                <tr key={pomodoro.id}>
                  <td>{pomodoro.planned}</td>
                  <td>{pomodoro.actual}</td>
                  <td>{(new Date(pomodoro.startTime)).toLocaleString()}</td>
                </tr>)} */}

              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>)
  }

  private onClick (event: React.SyntheticEvent<HTMLButtonElement>) {
    event.preventDefault()
    
    const { actual, planned } = this.state
    this.props.addItem!(createPomodoro(
      "psgivens",        
      planned,
      actual,
    ))
  }

  private onActualChange (event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()
    this.setState({ ...this.state, actual: event.currentTarget.value})    
  }

  private onPlannedChange (event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()
    this.setState({ ...this.state, planned: event.currentTarget.value})    
  }

}

export const ListDemo =
  connect<{}, {}, container.AttributeProps>(container.mapStateToProps, container.mapDispatchToProps) (PureListDemo)