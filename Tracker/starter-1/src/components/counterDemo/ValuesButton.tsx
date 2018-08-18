import * as React from 'react';
import { connect } from 'react-redux';

import * as container from './ValuesButtonConnect'

import Button from '../../common/Button'

type ComponentState = {} & {}

class PureValuesButton extends React.Component<container.StateProps & container.ConnectedDispatch & container.AttributeProps, ComponentState> {
  public render () {
    const { values } = this.props
    return <div>      
      <Button onClick={this.onClick} text="Get Values!" />
      <pre>Values = {JSON.stringify(values)}</pre>
    </div>
  }

  private onClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    this.props.triggerThing!()
    }
}

export const ValuesButton = 
  connect<{}, {}, container.AttributeProps>(container.mapStateToProps, container.mapDispatchToProps) (PureValuesButton)



