import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Auxilary from '../Auxilary'


const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {
        constructor() {
            super();
            this.state ={
                error: null
            }
            // axios.interceptors.request.use(res => {
            //     this.setState({ error: null })
            //     return res;
            // })
            // axios.interceptors.response.use( res => res, err => {
            //     console.log(err)
            //     this.setState({ error: err })
            // })
        }
        
        componentWillMount () {
            this.reqInterceptor =  axios.interceptors.request.use(res => {
                this.setState({ error: null })
                return res;
            })
            this.resInterceptor = axios.interceptors.response.use( res => res, err => {
                console.log(err)
                this.setState({ error: err })
            })
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }
        render() {
            // if(this.state.error)
            //     console.log(this.state.error)
            return(
                <Auxilary>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        { this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxilary>
            )
        }
    }
}

export default withErrorHandler