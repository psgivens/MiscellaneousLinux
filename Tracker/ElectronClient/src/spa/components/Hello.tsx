import * as React from "react"
import { Counter } from "./Counter"
import { Pomodoro } from "./Pomodoro"
import { PomodoroGuage } from "./PomodoroGuage"

export interface HelloProps { compiler: string; framework: string; }

export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <div>
            <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
            {/* <Counter /> */}
            <h3>Pomodoro</h3>
            <Pomodoro />
            <PomodoroGuage />
        </div>;
    }
}