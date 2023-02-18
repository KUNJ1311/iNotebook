import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
	const host = "http://localhost:5000";
	const notesInitial = [];
	const [notes, setNotes] = useState(notesInitial);
	//Get all Notes
	const getNotes = async () => {
		//API Call
		const response = await fetch(`${host}/api/notes/fetchallnotes`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYTRjODZlYTljZDU3ZmQyMjYwMWM1In0sImlhdCI6MTY3NjI5OTQ4Nn0.BgZztBYGr9F58pjJdEQ8sikDjSB6NM-K_wenoWQAmeY",
			},
		});
		const json = await response.json();
		console.log(json);
		setNotes(json);
	};

	//Add a Notes
	const addNote = async (title, description, tag) => {
		//API Call
		const response = await fetch(`${host}/api/notes/addnote`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYTRjODZlYTljZDU3ZmQyMjYwMWM1In0sImlhdCI6MTY3NjI5OTQ4Nn0.BgZztBYGr9F58pjJdEQ8sikDjSB6NM-K_wenoWQAmeY",
			},
			body: JSON.stringify({ title, description, tag }),
		});
		const note = {
			_id: "63deb0df8437a5388d742a0d4",
			user: "63dfsea4c86ea9cd57fd22601c5",
			title: title,
			description: description,
			tag: tag,
			date: "2023-02-14T04:28:40.489Z",
			__v: 0,
		};
		setNotes(notes.concat(note));
	};

	//Delete a Note
	const deleteNote = async (id) => {
		//TODO: API Call
		const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYTRjODZlYTljZDU3ZmQyMjYwMWM1In0sImlhdCI6MTY3NjI5OTQ4Nn0.BgZztBYGr9F58pjJdEQ8sikDjSB6NM-K_wenoWQAmeY",
			},
		});
		const json = response.json();
		console.log(json);
		const newNotes = notes.filter((note) => {
			return note._id !== id;
		});
		setNotes(newNotes);
	};

	//Edit a Note
	const editNote = async (id, title, description, tag) => {
		//API Call
		const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYTRjODZlYTljZDU3ZmQyMjYwMWM1In0sImlhdCI6MTY3NjI5OTQ4Nn0.BgZztBYGr9F58pjJdEQ8sikDjSB6NM-K_wenoWQAmeY",
			},
			body: JSON.stringify({ title, description, tag }),
		});
		const json = response.json();
		let newNotes = JSON.parse(JSON.stringify(notes));
		//Logic to edit on client side
		for (let index = 0; index < newNotes.length; index++) {
			const element = newNotes[index];
			if (element._id === id) {
				newNotes[index].title = title;
				newNotes[index].description = description;
				newNotes[index].tag = tag;
				break;
			}
		}
		setNotes(newNotes);
	};

	return <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
