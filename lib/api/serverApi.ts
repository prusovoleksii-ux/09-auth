import { Note } from "@/types/note";
import { nextServer } from "./api";
import { GetNotesParams, Resp } from "./clientApi";
import { cookies } from "next/headers";
import { User } from "@/types/user";


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
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return res.data;
}

//checkSession
type CheckSessionRequest = {
  success: boolean;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get<CheckSessionRequest>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

//getMe
export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/auth/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};