import React from 'react';

const Login = () => {
    return (
        <div>
            <h1>Welcome to Our Application</h1>
            <h2>Please log in to continue</h2>
            <form>
                <div>
                    <h2>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                    </h2>
                </div>
                <div>
                    <h2>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                    </h2>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
