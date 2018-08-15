// This component handles the App template used on every page.
import * as React from 'react';
import { connect } from 'react-redux';

import Button from '../common/Button'

import * as container from '../containers/SecondDemo'

type ThisProps = container.StateProps & container.ConnectedDispatch & container.AttributeProps

const PureSecondDemo: React.SFC<ThisProps> = (props:ThisProps) => {
  const onClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    props.addItem!({
      actual: "Actually posted from UI",
      id: Math.floor(Math.random() * 1000000000),
      name: "Phillip",
      planned: "Posting the thing from the UI",
      startTime: Date.now(),
      userId: "psgivens",
      version: 0
    })
  }
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
          <Button onClick={onClick} text="Add Item" />
        </p>
      </div>
    </section>
  </div>)
}

export const SecondDemo =
  connect<{}, {}, container.AttributeProps>(container.mapStateToProps, container.mapDispatchToProps) (PureSecondDemo)