import React, { useState }from 'react';

const  FindUser =() => {

    const [userToFind, setUserToFind] = useState("");
    const onChangeUserToFind = (e) => {
        setUserToFind(e.target.value);
    }
    const onSubmit = (e) => {
        e.preventDefault(); // allows us override the default html stuff
        window.location = `/${userToFind}`;
    }

    return (
        <div>
            <h3>Edit profile</h3>
            <form onSubmit={ onSubmit }>
                <div className="form-group">
                    <label>Search using user's username</label>
                    <input type="text"
                        required
                        className ="form-control"
                        value={userToFind}
                        onChange={onChangeUserToFind}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="submit"
                        value="Find user's profile"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    )
}
export default FindUser;