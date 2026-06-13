import { NewNoteValues, Note } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";

export interface Resp {
  notes: Note[];
  totalPages: number;
}

export type GetNotesParams = {
  search?: string;
  page?: number;
  tag?: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};


export async function getNotes({
  search = "",
  page = 1,
  tag,
}: GetNotesParams = {}): Promise<Resp> {
  const res = await nextServer.get<Resp>('/notes', {
    params: {
      search,
      page,
      ...(tag ? { tag } : {}),
    },
  });

  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function postNote(newNote: NewNoteValues): Promise<Note> {
  const res = await nextServer.post<Note>('/notes', newNote);
  return res.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const res = await nextServer.delete<Note>(`/notes/${noteId}`);
  return res.data;
}

//register
export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

//login
export async function login (data: LoginRequest) {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
}

//logout
export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

//checkSession
type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

//getMe
export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

//updateMe
export type UpdateUserRequest = {
  email?: string;
  username?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};
