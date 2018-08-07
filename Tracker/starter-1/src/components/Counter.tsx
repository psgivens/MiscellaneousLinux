import * as React from 'react';
import { connect } from 'react-redux';

import * as container from '../containers/Counter'

import Button from '../common/Button'

type ComponentState = {} & {}

class PureCounter extends React.Component<container.StateProps & container.ConnectedDispatch & container.AttributeProps, ComponentState> {
  public render () {
    const { counter, values } = this.props
    return <div>
      <pre>counter = {counter}</pre>
      <Button onClick={this.onClickIncrement} text="Click Me!" />
      <pre>
          {JSON.stringify({
            counter, 
            "values": values
          }, null, 2)}
        </pre>
    </div>
  }

  private onClickIncrement = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const { name } = this.props
    this.props.increment!(name)
    this.props.triggerThing!()
    }
}

export const Counter = 
  connect<{}, {}, container.AttributeProps>(container.mapStateToProps, container.mapDispatchToProps) (PureCounter)



