import { getGitHubActivity } from "@/lib/github";

export async function GitHubActivity() {
  const activity = await getGitHubActivity();
  if (!activity) return null;

  return (
    <div className="space-y-10">
      {/* Repositories */}
      <div>
        <p className="eyebrow">Latest Repositories</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {activity.repos.map((repo) => (
            <li key={repo.name}>
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="block h-full rounded-[18px] border border-line bg-paper p-5 transition hover:border-ink"
              >
                <p className="text-[15px] font-medium">{repo.name}</p>
                {repo.description && (
                  <p className="mt-1.5 text-[12px] leading-relaxed text-mute">{repo.description}</p>
                )}
                {repo.language && (
                  <p className="mt-3 text-[11px] tracking-wider text-accent-deep">{repo.language}</p>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Commits */}
      {activity.commits.length > 0 && (
        <div>
          <p className="eyebrow">Recent Commits</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {activity.commits.map((commit, i) => (
              <li key={i} className="h-full rounded-[18px] border border-line bg-paper p-5">
                <p className="text-[13px] leading-relaxed">{commit.message}</p>
                <p className="mt-3 text-[11px] tracking-wider text-accent-deep">{commit.repo}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
