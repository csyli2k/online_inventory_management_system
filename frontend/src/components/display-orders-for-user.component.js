import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import Button from "@mui/material/Button";
import UserService from "../services/user.service";
import OrderService from "../services/order.service";
import ItemService from "../services/item.service";
import StoreService from "../services/store.service";

export default class DisplayOrdersForUserComponent extends Component {
    constructor(props) {
        super(props);
        this.handleAccountChange = this.handleAccountChange.bind(this);
        this.onSubmitAccountChange = this.onSubmitAccountChange.bind(this);
        this.handleStoreNameChange = this.handleStoreNameChange.bind(this);
        this.handleOrderNameChange = this.handleOrderNameChange.bind(this);
        this.handleItemNameChange = this.handleItemNameChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleUnitPriceChange = this.handleUnitPriceChange.bind(this);
        this.onRequestItem = this.onRequestItem.bind(this);
        this.state = {
            orderList: [],
            account: "",
            orderId: "",
            orderName: "",
            itemName: "",
            quantity: 0,
            unitPrice: 0,
            message: ""
        }
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        this.setState({
            account: currentUser.account
        });
        if (!currentUser) this.setState({ redirect: "/home" });
    }

    handleAccountChange(e) {
        this.setState({
            account: e.target.value
        })
    }

    onSubmitAccountChange() {
        OrderService.getOrdersForAccount(this.state.account).then(response => {
            console.log(response.data);
            this.setState( {
                    orderList: response.data.orders
                }
            )
        });
    }

    handleOrderNameChange(e) {
        this.setState({
            orderName: e.target.value
        })
    }

    handleStoreNameChange(e) {
        this.setState({
            storeName: e.target.value
        })
    }

    handleQuantityChange(e) {
        this.setState({
            quantity: e.target.value
        })
    }

    handleItemNameChange(e) {
        this.setState({
            itemName: e.target.value
        })
    }

    handleUnitPriceChange(e) {
        this.setState({
            unitPrice: e.target.value
        })
    }

    onRequestItem() {

        OrderService.requestItemForOrder(
            this.state.storeName,
            this.state.orderName,
            this.state.itemName,
            this.state.quantity,
            this.state.unitPrice
        ).then(res => {
                console.log("response is: ");
                console.log(res);
                switch (res.data) {
                    case "OK_CHANGE": {
                        this.setState({
                            message: "saved successfully"
                        });
                        break;
                    }
                    case "STORE_DOES_NOT_EXIST": {
                        this.setState({
                            message: "store doesn't exist"
                        });
                        break;
                    }
                    case "ORDER_DOES_NOT_EXIST": {
                        this.setState({
                            message: "order doesn't exist"
                        });
                        break;
                    }
                    default:
                        this.setState({
                            message: res.data ? res.data : "it looks like something is off"
                        });
                }
            })
    }

    render() {
        return (
            <div>
                <div>
                    <label> Account: </label>
                    <input
                        type={"text"}
                        name="accountName"
                        placeholder="Enter account name"
                        value={this.state.account}
                        onChange={this.handleAccountChange}
                    />{" "}
                </div>
                <div>
                    <Button variant="contained"
                            type="submit"
                            onClick={this.onSubmitAccountChange}>Enter Account Id</Button>
                </div>
                <br/><br/>

                <h2 className="text-center">Display Orders</h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th> Order ID</th>
                            <th> Order StoreName</th>
                            <th> Order OrderName</th>
                            <th> Order droneName</th>
                            <th> Order weight</th>
                            <th> Order cost</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.orderList.map(
                                order =>
                                    <tr key={order.orderId}>
                                        <td> {order.orderId} </td>
                                        <td> {order.storeName} </td>
                                        <td> {order.orderName}</td>
                                        <td> {order.droneName}</td>
                                        <td> {order.weight}</td>
                                        <td> {order.cost}</td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>

                </div>

                <div>
                    <label> Store Name: </label>
                    <input
                        type={"text"}
                        name="storeName"
                        placeholder="Enter store Name"
                        value={this.state.storeName}
                        onChange={this.handleStoreNameChange}
                    />{" "}
                </div>
                <div>
                    <label> Order Name: </label>
                    <input
                        type={"text"}
                        name="orderName"
                        placeholder="Enter order name"
                        value={this.state.orderName}
                        onChange={this.handleOrderNameChange}
                    />{" "}
                </div>
                <div>
                    <label> Item Name: </label>
                    <input
                        type={"text"}
                        name="itemName"
                        placeholder="Enter item name"
                        value={this.state.itemName}
                        onChange={this.handleItemNameChange}
                    />{" "}
                </div>
                <div>
                    <label> Quantity: </label>
                    <input
                        type={"text"}
                        name="quantity"
                        placeholder="Enter quantity"
                        value={this.state.quantity}
                        onChange={this.handleQuantityChange}
                    />{" "}
                </div>
                <div>
                    <label> Unit Price: </label>
                    <input
                        type={"text"}
                        name="unitPrice"
                        placeholder="Enter unit price"
                        value={this.state.unitPrice}
                        onChange={this.handleUnitPriceChange}
                    />{" "}
                </div>
                <div>
                    <Button variant="contained"
                            type="submit"
                            onClick={this.onRequestItem}>Request Item</Button>
                </div>
                <div>
                    <label>{this.state.message}</label>
                </div>
                <br/><br/>

            </div>
        );
    }
}



