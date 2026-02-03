import { Octokit } from "octokit";
import "dotenv/config";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function getRepos() {
    try {
        return await octokit.paginate('GET /orgs/{org}/repos', {
            org: 'stackbuilders',
            per_page: 100,
            sort: 'updated',
            direction: 'desc'
        }); 
    } catch (error) {
        throw new Error("Error fetching repositories:", error);
    }
}

export const getPopularRepos = repos => {
    if (!repos || repos.length === 0) {
        return [];
    }
    return [...repos]
        .filter(repo => repo.stargazers_count > 5)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .map(repo => ({
            name: repo.name, 
            stargazers_count: repo.stargazers_count
        }));
}

export const getUpdatedRepos = repos => {
    if (!repos || repos.length === 0) {
        return [];
    }
    return [...repos]
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 5)
        .map(repo => ({
            name: repo.name, 
            updated_at: repo.updated_at
        }));
}

export const getTotalStars = repos => {
    if (!repos || repos.length === 0) {
        return 0;
    }
    return repos.reduce((total, repo) => total + repo.stargazers_count, 0);
}