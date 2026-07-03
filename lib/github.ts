const GITHUB_USERNAME = "yukisasai";

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  updated_at: string;
  stargazers_count: number;
};

type GitHubEvent = {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    commits?: { message: string }[];
  };
};

export type GitHubActivity = {
  repos: {
    name: string;
    description: string | null;
    url: string;
    language: string | null;
    updatedAt: string;
  }[];
  commits: {
    repo: string;
    message: string;
    date: string;
  }[];
};

async function fetchGitHub(endpoint: string): Promise<Response> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`https://api.github.com${endpoint}`, {
    headers,
    next: { revalidate: 3600 },
  });
}

export async function getGitHubActivity(): Promise<GitHubActivity | null> {
  try {
    const [reposRes, eventsRes] = await Promise.all([
      fetchGitHub(`/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=4`),
      fetchGitHub(`/users/${GITHUB_USERNAME}/events/public?per_page=30`),
    ]);

    if (!reposRes.ok || !eventsRes.ok) return null;

    const repos: GitHubRepo[] = await reposRes.json();
    const events: GitHubEvent[] = await eventsRes.json();

    const pushEvents = events.filter((e) => e.type === "PushEvent");
    const commits = pushEvents
      .flatMap((e) =>
        (e.payload.commits ?? []).map((c) => ({
          repo: e.repo.name.replace(`${GITHUB_USERNAME}/`, ""),
          message: c.message.split("\n")[0],
          date: e.created_at,
        })),
      )
      .slice(0, 5);

    return {
      repos: repos.map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        language: r.language,
        updatedAt: r.updated_at,
      })),
      commits,
    };
  } catch {
    return null;
  }
}
