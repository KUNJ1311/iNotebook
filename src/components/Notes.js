import { React, useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./Noteitem";
const Notes = () => {
	const context = useContext(noteContext);
	const { notes, getNotes } = context;
	useEffect(() => {
		getNotes();
	}, []);

	return (
		<>
			<AddNote />
			<div className="row my-2">
				<h2>Your Notes</h2>
				{notes.map((note) => {
					return <NoteItem key={note._id} note={note} />;
				})}
			</div>
		</>
	);
};

export default Notes;