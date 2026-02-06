import { Octokit } from "octokit";
import type { Endpoints } from "@octokit/types";
import "dotenv/config";

type RepoResponse = Endpoints["GET /orgs/{org}/repos"]["response"]["data"][number];

export interface GitHubRepository {
    readonly name: string;
    readonly stargazers_count: number;
    readonly updated_at: string | null;
}

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const isPopular = (repo: GitHubRepository): boolean => repo.stargazers_count > 5;
const isReposEmpty = (repos: GitHubRepository[]): boolean => repos.length === 0;
const sortByMostRecentUpdate = (a: GitHubRepository, b: GitHubRepository): number => {
    const dateA = new Date(a.updated_at ?? 0).getTime();
    const dateB = new Date(b.updated_at ?? 0).getTime();
    return dateB - dateA;
};

export async function getRepos(): Promise<GitHubRepository[]> {
    try {
        const repos = await octokit.paginate('GET /orgs/{org}/repos', {
            org: 'stackbuilders',
            per_page: 100,
            direction: 'desc'
        }); 
        return repos.map((repo: RepoResponse) => ({
            name: repo.name,
            stargazers_count: repo.stargazers_count ?? 0,
            updated_at: repo.updated_at ?? null,
        }));
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error fetching repositories: ${error.message}`);
        }
        throw new Error("An unknown error occurred");
    }
}

export const getPopularRepos = (repos: GitHubRepository[]): GitHubRepository[] => {
    if (isReposEmpty(repos)) {
        return [];
    }
    return [...repos]
        .filter(isPopular)
        .sort((a, b) => b.stargazers_count - a.stargazers_count);
}

export const getLatestUpdatedRepos = (repos: GitHubRepository[], topN: number = 3): GitHubRepository[] => {
    if (isReposEmpty(repos) || topN <= 0) {
        return [];
    }
    return [...repos]
        .sort(sortByMostRecentUpdate)
        .slice(0, topN);
}

export const getTotalStars = (repos: GitHubRepository[]): number => {
    if (isReposEmpty(repos)) {
        return 0;
    }
    return repos.reduce((total, repo) => total + repo.stargazers_count, 0);
}

export const getReposAlphabetical = (repos: GitHubRepository[]): GitHubRepository[] => {
    if (isReposEmpty(repos)) {
        return [];
    }
    return [...repos].sort((a, b) => a.name.localeCompare(b.name));
}