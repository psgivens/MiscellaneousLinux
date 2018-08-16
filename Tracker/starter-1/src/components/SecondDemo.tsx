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
}

class PureSecondDemo extends React.Component<ThisProps, ComponentState> {

  constructor (props:ThisProps) {
    super (props)
    this.state = {
      actual: "b: Actually posted from UI",
    }
    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
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
            placeholder="Enter a value to see it's length"
            value={this.state.actual}
            onChange={this.onChange} />
            <br />

          </p>
        </div>
      </section>
    </div>)
  }

  private onClick (event: React.SyntheticEvent<HTMLButtonElement>) {
    event.preventDefault()
    
    const { actual } = this.state
    this.props.addItem!(createPomodoro(
      "psgivens",        
      "a: Posting the thing from the UI",
      actual,
    ))
  }

  private onChange (event: React.SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()
    this.setState({ ...this.state, actual: event.currentTarget.value})    
  }

}

export const SecondDemo =
  connect<{}, {}, container.AttributeProps>(container.mapStateToProps, container.mapDispatchToProps) (PureSecondDemo)