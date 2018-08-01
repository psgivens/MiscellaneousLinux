
import { connect } from 'react-redux';
import * as redux from 'redux';
import { ConnectedDispatch, ConnectedState, OwnProps, PomodoroGuageComponent } from '../components/PomodoroGuage'
import * as state from '../reducers'


type GuageAction = {
  type: 'NEW_COUNT'
} | {
  type: 'OTHER_ACTION'
}

const mapStateToProps = (state1: state.IAll, ownProps: OwnProps): ConnectedState => ({
  counter: state1.counter
})

const mapDispatchToProps = (dispatch: redux.Dispatch<GuageAction>): ConnectedDispatch => ({
    fake: 3
  })  

export const PomodoroGuage = 
  connect<{}, {}, OwnProps>(mapStateToProps, mapDispatchToProps) (PomodoroGuageComponent)
