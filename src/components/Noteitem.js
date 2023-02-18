import { React, useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
	const context = useContext(noteContext);
	const { deleteNote } = context;
	const { note } = props;
	return (
		<div className="col-md-3 ">
			<div className="card my-2 my-box">
				<div className="card-body">
					<div className="d-flex align-items-center ">
						<h5 className="card-title">{note.title}</h5>
						<div className="position-absolute my-2 top-0 end-0">
							<button
								className="my-button mx-1"
								onClick={() => {
									deleteNote(note._id);
								}}
							>
								<i className="fa-regular fa-trash-can after-hover"></i>
							</button>
							<button className="my-button mx-2">
								<i className="fa-regular fa-pen-to-square after-hover"></i>
							</button>
						</div>
					</div>
					<p className="card-text">{note.description} </p>
				</div>
			</div>
		</div>
	);
};

export default Noteitem;
