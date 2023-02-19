import { React, useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./Noteitem";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
	const context = useContext(noteContext);
	const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
	const { notes, getNotes, editNote } = context;
	const ref = useRef(null);
	const refClose = useRef(null);
	const { showAlert } = props;
	let navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			getNotes();
		} else {
			navigate("/login");
		}
		//eslint-disable-next-line
	}, []);

	const updateNote = (currentNote) => {
		ref.current.click();
		setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
	};

	const handleClick = (e) => {
		editNote(note.id, note.etitle, note.edescription, note.etag);
		refClose.current.click();
		props.showAlert("Updated Successfully", "success");
	};

	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	return (
		<>
			<AddNote showAlert={showAlert} />
			<button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#staticBackdrop">
				Launch static backdrop modal
			</button>
			<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5 bold fw-bolder" id="staticBackdropLabel">
								Edit Note
							</h1>
						</div>
						<div className="modal-body">
							<form className="my-3">
								<div className="mb-3">
									<label htmlFor="etitle" className="form-label">
										Title
									</label>
									<input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={3} required />
								</div>
								<div className="mb-3">
									<label htmlFor="edescription" className="form-label">
										Description
									</label>
									<input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onChange} minLength={5} required />
								</div>
								<div className="mb-3">
									<label htmlFor="etag" className="form-label">
										Tag
									</label>
									<input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onChange} />
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" onClick={handleClick} className="btn btn-primary" disabled={note.etitle.length < 3 || note.edescription.length < 5}>
								Update Note
							</button>
							<button type="button" className="btn btn-danger" ref={refClose} data-bs-dismiss="modal">
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="row container fluid my-2">
				<h2>Your Notes</h2>
				{notes.length === 0 && (
					<div className="container-fluid my-2">
						<h5 className="color-gray">Add notes to display here</h5>
					</div>
				)}
				{notes.map((note) => {
					return <NoteItem key={note._id} updateNote={updateNote} showAlert={showAlert} note={note} />;
				})}
			</div>
		</>
	);
};

export default Notes;
