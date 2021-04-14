import React, { useEffect, useState } from "react";
import firebaseDB from "../firebase.js";
import ContactForm from "./ContactForm";
import SingleContact from "./SingleContact.js";
function Contacts() {
	const [allContacts, setAllContacts] = useState([]);
	const [contactObjects, setContactObjects] = useState({});
	const [currentId, setCurrentId] = useState("");

	useEffect(() => {
		firebaseDB.child("contacts").on("value", (snapshot) => {
			if (snapshot.val() != null) {
				setContactObjects({
					...snapshot.val(),
				});
			} else {
				setContactObjects({});
			}
		});
	}, []);

	const onAddOrEdit = (obj) => {
		if (currentId === "") {
			setAllContacts([...allContacts, obj]);
			firebaseDB.child("contacts").push(obj, (err) => {
				if (err) {
					console.log(err);
				} else {
					setCurrentId("");
				}
			});
		} else {
			// setAllContacts([...allContacts, obj]);
			firebaseDB.child(`contacts/${currentId}`).set(obj, (err) => {
				if (err) {
					console.log(err);
				} else {
					setCurrentId("");
				}
			});
		}
	};

	const onDelete = (id) => {
		if (window.confirm("Are you sure to delete this record?")) {
			firebaseDB.child(`contacts/${id}`).remove((err) => {
				if (err) {
					console.log(err);
				}
			});
		}
	};

	return (
		<>
			<div className="row">
				<div className="col-md-5">
					<ContactForm
						onAddOrEdit={onAddOrEdit}
						currentId={currentId}
						contactObjects={contactObjects}
					/>
				</div>
				<div className="col-md-7">
					<table className="table table-hover table-responsive">
						<thead>
							<tr className="table-dark">
								<th scope="col">Name</th>
								<th scope="col">Mobile</th>
								<th scope="col">Email</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							{Object.keys(contactObjects).length ? "" : "Loading..."}

							{Object.keys(contactObjects).length &&
								Object.keys(contactObjects).map((id) => (
									<SingleContact
										key={id}
										id={id}
										contactInfo={contactObjects[id]}
										onDelete={onDelete}
										setCurrentId={setCurrentId}
									/>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default Contacts;
