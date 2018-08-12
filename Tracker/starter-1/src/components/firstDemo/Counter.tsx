import * as React from 'react';
import { connect } from 'react-redux';

import * as container from '../../containers/Counter'

import Button from '../../common/Button'

type ComponentState = {} & {}

class PureCounter extends React.Component<container.StateProps & container.ConnectedDispatch & container.AttributeProps, ComponentState> {
  public render () {
    const { counter } = this.props
    return <div>
      <Button onClick={this.onClickIncrement} text="Increment" />
      <Button onClick={this.onClickDecrement} text="Decrement" />
      <pre>
          counter = {counter}
        </pre>
    </div>
  }

  private onClickIncrement = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const { name } = this.props
    this.props.increment!(name)
    }

  private onClickDecrement = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const { name } = this.props
    this.props.decrement!(name)
    }    
}

export const Counter = 
  connect<{}, {}, container.AttributeProps>(container.mapStateToProps, container.mapDispatchToProps) (PureCounter)



