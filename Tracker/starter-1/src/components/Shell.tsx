// This component handles the App template used on every page.
import * as React from 'react';


import {connect} from 'react-redux';

// import Header from '../core/Header';

type ShellProps = {} & {
    children
}

const Shell: React.SFC<ShellProps> = ( { children }: ShellProps ) => 
    (<div className="container-fluid">        
        {children}
    </div>)

export default Shell