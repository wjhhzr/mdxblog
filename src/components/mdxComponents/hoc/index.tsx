import React from 'react'


function Hoc(Component, addProps:object){
    return class extends React.Component {
        private newProps: object
        constructor(props){
            super(props)
            this.newProps = Object.assign({},this.props, addProps)
        }

        render(){
            return <Component  {...this.newProps} />
        }
    }
}

export default Hoc;