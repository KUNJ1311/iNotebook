import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
	const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
	let navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { name, email, password } = credentials;
		const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, email, password }),
		});
		const json = await response.json();
		if (json.success) {
			localStorage.setItem("token", json.authtoken);
			props.showAlert("Account Created Successfully", "success");
			navigate("/");
		} else {
			props.showAlert("Invalid Credentails", "danger");
		}
	};
	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};
	return (
		<div className="container remove-px">
			<h2 className="text-center my-2">Login to continue to iNotebook</h2>
			<form onSubmit={handleSubmit} className="container remove-px">
				<div className="mb-3">
					<label forhtml="name" className="form-label">
						Name
					</label>
					<input type="text" className="form-control" onChange={onChange} name="name" id="name" aria-describedby="emailHelp" />
				</div>
				<div className="mb-3">
					<label forhtml="email" className="form-label">
						Email address
					</label>
					<input type="email" className="form-control" onChange={onChange} name="email" id="email" aria-describedby="emailHelp" />
					<div id="emailHelp" className="form-text">
						We'll never share your email with anyone else.
					</div>
				</div>
				<div className="mb-3">
					<label forhtml="password" className="form-label">
						Password
					</label>
					<input type="password" name="password" className="form-control" onChange={onChange} id="password" required minLength={5} />
				</div>
				<div className="mb-3">
					<label forhtml="cpassword" className="form-label">
						Confirm Password
					</label>
					<input type="password" name="cpassword" className="form-control" onChange={onChange} id="cpassword" required minLength={5} />
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
};

export default Signup;
