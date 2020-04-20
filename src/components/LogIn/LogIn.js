import React from 'react';
import './LogIn.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebase.config';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Review from '../Review/Review';

firebase.initializeApp(firebaseConfig);

const LogIn = () => {

    const [user, setUser] = useState({
        isSignedIn: false,
        isValidEmail: false,
        isValidPass: false,
        name: '',
        email: '',
        password1: '',
        password2: '',
        error: '',
        existingUser: false   
    });

    const switchForm = event => {
        const createdUser = {...user};
        createdUser.existingUser = event.target.checked;
        setUser(createdUser);
    }

    const isValidEmail = email => /(.+)@(.+){2,}\.(.+){2,}/.test(email);

    const handleChange = event => {
        const newUserInfo = {...user};

        if(event.target.name === 'email') {
            const valid = isValidEmail(event.target.value);
            newUserInfo.isValidEmail = valid;
        }

        if(event.target.name === 'password1' || event.target.name === 'password2') {
            const valid = event.target.value.length >= 6;
            newUserInfo.isValidPass = valid; 
        }

        newUserInfo[event.target.name] = event.target.value;
        setUser(newUserInfo);
    }

    const createAccount = (event) => {
        if(user.isValidEmail && user.isValidPass && (user.password1 === user.password2)) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password1)
            .then(res => {
                res.user.updateProfile({displayName: user.name});
                const createdUser = {...user};
                createdUser.isSignedIn = true;
                createdUser.error = '';
                setUser(createdUser);
                prompt('Account created successfully....');
            })
            .catch(err => {
                const createdUser = {...user};
                createdUser.isSignedIn = false;
                createdUser.error = err.message;
                console.log(err.message);
                setUser(createdUser);
            })
        } 
        else {
            console.log('Invalid Email or password');
        }
        event.preventDefault();
        event.target.reset();
    }

    const signInUser = event => {
        
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
            const userName = res.user.displayName;
            const createdUser = {...user};
            createdUser.isSignedIn = true;
            createdUser.name = userName;
            createdUser.error = '';
            setUser(createdUser);
        })
        .catch(err => {
            const createdUser = {...user};
            createdUser.isSignedIn = false;
            createdUser.error = err.message;
            setUser(createdUser);
        })
        event.preventDefault();
        event.target.reset();
    }

    
    return (
        
       <div>
            {user.isSignedIn ? <div><Review displayName={user.name}></Review></div> :
            <div className="login">
                <h2>Please sign in to continue....</h2>
                <form style={{display: user.existingUser ? 'block' : 'none'}} onSubmit={signInUser}>
                    <input type="text" name="email" onBlur={handleChange} placeholder="Email" required/>
                    <br/>
                    <input type="text" name="password" onBlur={handleChange} placeholder="Password" required/>
                    <br/>
                    {
                        user.isSignedIn ? <Link to="/review" displayName={user.name}><input type="submit" value="Sign In"/></Link> : 
                        <input type="submit" value="Sign In"/>
                    }
                </form>

                <form style={{display: user.existingUser ? 'none' : 'block'}} onSubmit={createAccount}>
                    <input type="text" name="name" onBlur={handleChange} placeholder="Name" required/>
                    <br/>
                    <input type="text" name="email" onBlur={handleChange} placeholder="Email" required/>
                    <br/>
                    <input type="text" name="password1" onBlur={handleChange} placeholder="Password" required/>
                    <br/>
                    <input type="text" name="password2" onBlur={handleChange} placeholder="Retype Password" required/>
                    <br/>
                    <input type="submit" value="Create Account"/>
                </form>

                <input type="checkbox" name="switchForm" onChange={switchForm} id="switchForm"/>
                <label htmlFor="switchForm"> Already have Account?</label>

                {
                    user.error && <p style={{color: 'red'}}>{user.error}</p>
                }
            </div>}
        </div>
    );
};

export default LogIn;