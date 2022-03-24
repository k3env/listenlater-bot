import { SpotifySessionData } from "./SpotifySessionData";

export default class SessionData {
  isActive: boolean;
  step: "idle" | "auth";
  state?: string;

  constructor() {
    this.isActive = false;
    this.step = "idle";
  }

  static initial() {
    return new SessionData();
  }
}
