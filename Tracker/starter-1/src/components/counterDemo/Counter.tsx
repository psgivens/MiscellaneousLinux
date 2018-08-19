import * as React from 'react';
import { connect } from 'react-redux';
import Button from '../../common/Button'
import * as container from './CounterConnect'

type CombinedProps = container.StateProps & container.ConnectedDispatch & container.AttributeProps

const renderCounter:React.SFC<CombinedProps> = ({counter, decrement, increment, name}:CombinedProps) => {  
  const onClickIncrement = (e: React.SyntheticEvent<HTMLButtonElement>):void => {
    e.preventDefault()
    increment!(name)
  }

  const onClickDecrement = (e: React.SyntheticEvent<HTMLButtonElement>):void => {
    e.preventDefault()
    decrement!(name)
  }    

  return <div>
    <Button onClick={onClickIncrement} text="Increment" />
    <Button onClick={onClickDecrement} text="Decrement" />
    <pre>
        counter = {counter}
      </pre>
  </div>
}
  
export const Counter = 
  connect<{}, {}, container.AttributeProps>(container.mapStateToProps, container.mapDispatchToProps) (renderCounter)



