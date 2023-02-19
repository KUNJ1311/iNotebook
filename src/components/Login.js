import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	let navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch(`http://192.168.114.101:5000/api/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: credentials.email, password: credentials.password }),
		});
		const json = await response.json();
		if (json.success) {
			//Save the auth token and redirect
			localStorage.setItem("token", json.authtoken);
			navigate("/");
		} else {
			alert("invalid");
		}
	};
	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label forhtml="email" className="form-label">
						Email address
					</label>
					<input type="email" className="form-control" value={credentials.email} onChange={onChange} name="email" id="email" aria-describedby="emailHelp" />
					<div id="emailHelp" className="form-text">
						We'll never share your email with anyone else.
					</div>
				</div>
				<div className="mb-3">
					<label forhtml="password" className="form-label">
						Password
					</label>
					<input type="password" name="password" className="form-control" value={credentials.password} onChange={onChange} id="password" />
				</div>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
};

export default Login;
