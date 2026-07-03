import { getGitHubActivity } from "@/lib/github";

export async function GitHubActivity() {
  const activity = await getGitHubActivity();
  if (!activity) return null;

  return (
    <div className="grid gap-10 md:grid-cols-2">
      {/* Repositories */}
      <div className="reveal">
        <h3 className="eyebrow mb-6">Latest Repositories</h3>
        <ul className="space-y-4">
          {activity.repos.map((repo) => (
            <li key={repo.name}>
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="card block !p-5 transition-colors hover:bg-neutral-50"
              >
                <p className="font-sans font-bold">{repo.name}</p>
                {repo.description && (
                  <p className="mt-1 text-sm text-muted">{repo.description}</p>
                )}
                {repo.language && (
                  <p className="label-mono mt-2">{repo.language}</p>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Commits */}
      {activity.commits.length > 0 && (
        <div className="reveal">
          <h3 className="eyebrow mb-6">Recent Commits</h3>
          <ul className="space-y-4">
            {activity.commits.map((commit, i) => (
              <li key={i} className="card !p-5">
                <p className="label-mono mb-1">{commit.repo}</p>
                <p className="text-sm">{commit.message}</p>
                <p className="label-mono mt-2">
                  {new Date(commit.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
