export interface Issue {
  id: number;
  number: number;
  state: "open" | "closed";
  title: string;
  body: string;
  user: {
    login: string;
  };
  pull_request?: {
    url: string;
  };
}
