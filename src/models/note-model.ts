import { localStorage } from '../services/local-storage-service';

interface NoteSchema {
	id: number;
	personId: number;
	content: string;
	updatedAt: string;
}

class NoteModel {
	private _note: NoteSchema;

	constructor(note: NoteSchema) {
		this._note = note;
	}

	create() {
		localStorage.set(`NOTE_${this._note.id}`, this._note);
	}

	update() {
		localStorage.get(`NOTE_${this._note.id}`);
	}
}

export { NoteModel };
