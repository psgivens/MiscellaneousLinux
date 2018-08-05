
import { connect } from 'react-redux';
import * as redux from 'redux';
import { ConnectedDispatch, ConnectedState, OwnProps, PomodoroGuageComponent } from '../components/PomodoroGuage'
import * as state from '../reducers'

// import { compose } from '../utils'

type GuageAction = {
  type: 'NEW_COUNT'
} | {
  type: 'OTHER_ACTION'
}

const mapStateToProps = (state1: state.IAll, ownProps: OwnProps): ConnectedState => {
  const value = state1.counters[ownProps.guageId] ? state1.counters[ownProps.guageId] : 3
  return {
    counter: value
  }
}

const mapDispatchToProps = (dispatch: redux.Dispatch<GuageAction>): ConnectedDispatch => ({
    
  })  

// export const PomodoroGuage = compose (
//   PomodoroGuageComponent,
//   connect<{}, {}, OwnProps>(mapStateToProps, mapDispatchToProps) 
// )

export const PomodoroGuage = 
  connect<{}, {}, OwnProps>(mapStateToProps, mapDispatchToProps) (PomodoroGuageComponent)
