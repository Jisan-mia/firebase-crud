import React, { useEffect, useState } from "react";

function ContactForm({ onAddOrEdit, currentId, contactObjects }) {
	const initialFieldValues = {
		fullName: "",
		mobile: "",
		email: "",
		address: "",
	};
	const [formValues, setFormValues] = useState(initialFieldValues);

	useEffect(() => {
		if (currentId === "") {
			setFormValues({ ...initialFieldValues });
		} else {
			setFormValues(contactObjects[currentId]);
		}
	}, [currentId, contactObjects]);

	const handleInputChage = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		if (
			formValues.fullName.length &&
			formValues.mobile.length &&
			formValues.email.length
		) {
			onAddOrEdit(formValues);
		} else {
			alert("Enter valid input");
		}

		setFormValues({
			...formValues,
			fullName: "",
			mobile: "",
			email: "",
			address: "",
		});
	};

	return (
		<form onSubmit={handleFormSubmit} className="row" autoComplete="off">
			{/*input full name */}
			<div className="col-md-6">
				<div className="input-group form-group mb-3">
					<span className="input-group-text" id="basic-addon1">
						<i className="fas fa-user"></i>
					</span>
					<input
						name="fullName"
						type="text"
						className="form-control "
						placeholder="Full Name"
						value={formValues.fullName}
						onChange={handleInputChage}
					/>
				</div>
			</div>

			{/*input mobile number */}
			<div className="col-md-6">
				<div className="input-group form-group mb-3 ">
					<span className="input-group-text ">
						<i className="fas fa-mobile-alt"></i>
					</span>
					<input
						name="mobile"
						type="text"
						value={formValues.mobile}
						onChange={handleInputChage}
						className="form-control"
						placeholder="Mobile"
					/>
				</div>
			</div>

			{/* input email  */}
			<div className="col-md-12">
				<div className="input-group form-group mb-3">
					<span className="input-group-text">
						<i className="fas fa-envelope"></i>
					</span>
					<input
						name="email"
						type=""
						value={formValues.email}
						onChange={handleInputChage}
						className="form-control"
						placeholder="Email"
					/>
				</div>
			</div>

			{/* input address */}
			<div className="col-md-12">
				<div className="input-group form-group mb-3">
					<span className="input-group-text" id="basic-addon1">
						<i className="fas fa-map-marked-alt"></i>
					</span>
					<textarea
						name="address"
						value={formValues.address}
						className="form-control"
						placeholder="Address"
						onChange={handleInputChage}
					></textarea>
				</div>
			</div>
			<div className="col-md-12 mb-3">
				<input
					type="submit"
					value={currentId === "" ? "Register" : "Update"}
					className="btn btn-primary w-100"
				/>
			</div>
		</form>
	);
}

export default ContactForm;
