import React, { Component } from 'react'

export default class AboutMe extends Component {
    constructor(props){
        super(props);
        this.state = {
            infomation: [
            {title: "Name", value: "Micheal Clensay"},
            {title: "Inspirations", value: "I want to be a construction engineer"},
            {title: "Email", value: "CleansayM@techpirates.com"},
            {title: "Jobs", value: ["Baker"]},
            {title: "Experiences", value: ["CEO of Marketing"]}
            ]
        };
    }

    render() {
        return (
            <div>
                <ul>
                {this.state.infomation.map(function(val){
                    return <li>{val.title}: {val.value}</li>;
                  })}
                </ul>
            </div>
        )
    }
}
