import React, { Component } from "react";
import { Modal, Button, FormControl } from "react-bootstrap"; 
import { confirmable, createConfirmation } from "react-confirm"; 

class confirmation extends Component {
    constructor() {
        super(); 
        this.state = {
            inputData: ""
        };
    }

    handleClick() {
        const { proceed } = this.props;
        return () => {
            proceed({
                input: this.state.inputData
            }); 
        }
    }

    render() {
        const { show, dismiss, cancel, message } = this.props;
        
        return (
            <div className="static-modal">
                <Modal show={show} onHide={dismiss} >
                    <Modal.Header>
                        <Modal.Title>Are you sure ?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        You are about to delete your account. Please confirm by entering your password.
                        { message }
                    </Modal.Body>
                    <Modal.Footer>
                        <FormControl
                            type="password"
                            value={ this.state.inputData }
                            onChange={(event) => {
                                this.setState({
                                    "inputData": event.target.value
                                });
                            }} 
                        />
                        <Button onClick={ cancel }> Cancel </Button>
                        <Button className="button-1" onClick={ this.handleClick() }> OK </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export const confirm = createConfirmation( confirmable(confirmation) ); 
