export class SpotifySessionData {
  access_token?: string;
  token_type?: "Bearer" | "unknown";
  scope?: string[];
  expires?: number;
  refresh_token?: string;
}

export class SpotifyAuthRequest {
  code?: string;
  error?: string;

  state: string;

  constructor(state: string) {
    this.state = state;
  }
}
