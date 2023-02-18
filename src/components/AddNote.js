import { React, useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
	const context = useContext(noteContext);
	const [note, setNote] = useState({ title: "", description: "", tag: "" });
	const { addNote } = context;
	const handleClick = (e) => {
		e.preventDefault();
		addNote(note.title, note.description, note.tag);
		setNote({ title: "", description: "", tag: "" });
	};
	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};
	return (
		<div>
			<div className="container my-3">
				<h2>Add a Note</h2>
				<form className="my-3">
					<div className="mb-3">
						<label htmlFor="title" className="form-label">
							Title
						</label>
						<input value={note.title} type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={3} required />
					</div>
					<div className="mb-3">
						<label htmlFor="description" className="form-label">
							Description
						</label>
						<input value={note.description} type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={5} required />
					</div>
					<div className="mb-3">
						<label htmlFor="tag" className="form-label">
							Tag
						</label>
						<input value={note.tag} type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
					</div>
					<button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary my-2" onClick={handleClick}>
						Add Note
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddNote;
