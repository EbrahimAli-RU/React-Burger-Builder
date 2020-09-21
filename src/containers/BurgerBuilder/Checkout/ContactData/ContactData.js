import React, { Component } from 'react'
import Button from '../../../../components/UI/Button/Button'
import Classes from './ContactData.css'
import axios from '../../../../axios-orders'
import Spinner from '../../../../components/UI/Spinner/Spinner'
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        const order = {
            ingredient: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Ebrahim',
                address: {
                    street: 'test',
                    zipCode: '55654',
                    country: 'Bangladesh'
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order).then(res => {
            this.setState({ loading: false })
            this.props.history.push('/')
        }).catch(err => {
            this.setState({ loading: false })
        })
        console.log(this.props.ingredients)
    }
    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="your name" />
                <input type="email" name="email" placeholder="your email" />
                <input type="text" name="street" placeholder="Street" />
                <input type="text" name="postal" placeholder="Postal code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />
        }
        return(
            <div className={Classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }

}

export default ContactData