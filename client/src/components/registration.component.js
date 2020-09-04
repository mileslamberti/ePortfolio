import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default class CreateRegistration extends Component{
    
    constructor(props){
        super(props);

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.state = {
            username: '',
            password: '',
            email: '',
            date: new Date()
        }
    }

    onChangeDate(date){
        this.setState({
            date: date
        })
    }
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }
    render(){
        return(
            <div>
                <h3>Registration page</h3>
                <form>
                    <div className="form-group">
                        <label>Desired username</label>
                        <input type="text"
                            required
                            className="form-control"
                            placeholder="(Enter your desired username between 6-15 characters)"
                            value={this.state.username}                      
                            onChange={this.onChangeUsername}
                        ></input>
                    </div>
                    <div className="form-group">
                        <label>Desired password</label>
                        <input type="password"
                            required
                            className="form-control"
                            placeholder="Enter your desired password (must be longer than 6 characters)"
                            value={this.state.password}                      
                            onChange={this.onChangePassword}
                        ></input>
                    </div>
                    <div className="form-group">
                    <label>Email address</label>
                        <input type="text"
                            required
                            className="form-control"
                            placeholder="example@yourmail.com"
                            value={this.state.email}                      
                            onChange={this.onChangeEmail}
                        ></input>
                    </div>
                    <div className="form-group">
                        <label>Date of birth</label>
                        <DatePicker
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        )
    }
}