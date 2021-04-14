import React from "react";

function SingleContact({ contactInfo, id, onDelete, setCurrentId }) {
	return (
		<tr>
			<th>{contactInfo.fullName}</th>
			<td>{contactInfo.mobile} </td>
			<td> {contactInfo.email} </td>
			<td className="action-icons">
				<i
					className="far fa-edit"
					onClick={() => {
						setCurrentId(id);
					}}
				></i>
				<i className="far fa-trash-alt" onClick={() => onDelete(id)}></i>
			</td>
		</tr>
	);
}

export default SingleContact;
