export interface CreateSessionInput {
  title: string;
  audioUrl: string;
  audioDurationSeconds?: number;
  rawTranscript?: string;
  tagId?: string;

  themes: {
    title: string;
    points: {
      text: string;
    }[];
  }[];
}
