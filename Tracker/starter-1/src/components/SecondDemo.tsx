// This component handles the App template used on every page.
import * as React from 'react';
import { connect } from 'react-redux';

import Button from '../common/Button'

import * as container from '../containers/SecondDemo'

import { createPomodoro } from '../data/PomodoroData'

import TextInput from '../common/TextInput'

type ThisProps = container.StateProps & container.ConnectedDispatch & container.AttributeProps

type ComponentState = {} & {
  actual: string
  planned: string
}

class PureSecondDemo extends React.Component<ThisProps, ComponentState> {

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
      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">
            Documentation
          </p>
          <p className="subtitle">
            Everything you need to <strong>create a website</strong> with Bulma
          </p>
        </div>
      </section>    
      <section className="section">
        <div className="container">
          <h1 className="title"> 
              Hello World!
          </h1>
          <p className="subtitle">
              My first website with <strong>Bulma</strong>!
          </p>
          <p>
            <Button onClick={this.onClick} text="Add Item" />
          </p>
          <p>
          <TextInput
            inputType="text"
            label="Actual Value"            
            name="actual"
            placeholder="Enter what actually was worked on"
            value={this.state.actual}
            onChange={this.onActualChange} />
            <br />
            <TextInput
            inputType="text"
            label="Planned Value"            
            name="planned"
            placeholder="Enter what you planned to work on"
            value={this.state.planned}
            onChange={this.onPlannedChange} />


          </p>
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

export const SecondDemo =
  connect<{}, {}, container.AttributeProps>(container.mapStateToProps, container.mapDispatchToProps) (PureSecondDemo)