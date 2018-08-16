import * as React from 'react';


type AttributeProps = {} & {
    name: string
    value: string
    onChange: (value: React.SyntheticEvent<HTMLInputElement>) => void
    placeholder: string
    inputType: string
    label:string
}

type ComponentState = {} & {

}

export default class TextInput extends React.Component<AttributeProps, ComponentState> {

    constructor (props: AttributeProps) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    public render () {
        const input = <div><input 
            name={this.props.name}
            className="form-control"
            placeholder={this.props.placeholder}
            ref={this.props.name}
            value={this.props.value}
            onChange={this.onChange}
            type={this.props.inputType ? this.props.inputType : "text"}
            size={60} /></div>;
        return this.props.label ? <div className="form-group">
                        <label htmlFor={this.props.name}>{this.props.label}</label>
                        {input}
                    </div> : input;
    }

    private onChange(event: React.SyntheticEvent<HTMLInputElement>) {
        event.preventDefault()
        const { onChange } = this.props        
        onChange(event)
    }
}

// type={this.props.inputType || "text"}