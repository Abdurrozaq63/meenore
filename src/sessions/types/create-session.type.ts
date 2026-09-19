export interface CreateSessionData {
  userId: string;
  tagId?: string;
  title: string;
  audioUrl: string;
  audioDurationSeconds?: number;
  rawTranscript?: string;
}
