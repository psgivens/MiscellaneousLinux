import * as React from 'react';
import { connect } from 'react-redux';

import * as container from './ValuesButtonConnect'

import Button from '../../common/Button'

type CombinedProps = container.StateProps & container.ConnectedDispatch & container.AttributeProps
const renderValuesButton:React.SFC<CombinedProps> = ({triggerThing, values}:CombinedProps) => {
  const onClick = (e: React.SyntheticEvent<HTMLButtonElement>):void => {
    e.preventDefault()
    triggerThing!()
  }

  return <div>      
    <Button onClick={onClick} text="Get Values!" />
    <pre>Values = {JSON.stringify(values)}</pre>
  </div>
}

export const ValuesButton = 
  connect<{}, {}, container.AttributeProps>(container.mapStateToProps, container.mapDispatchToProps) (renderValuesButton)



