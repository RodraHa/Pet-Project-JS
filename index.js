import { Octokit } from "octokit";
import "dotenv/config";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function getRepos() {
    return await octokit.paginate('GET /orgs/{org}/repos', {
        org: 'stackbuilders',
        per_page: 100,
        sort: 'updated',
        direction: 'desc'
    }); 
}

export const getPopularRepos = repos => {
    return repos
        .filter(repo => repo.stargazers_count > 5)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .map(repo => ({
            name: repo.name, 
            stargazers_count: repo.stargazers_count
        }));
}

export const getUpdatedRepos = repos => {
    return repos
        .slice(0, 5)
        .map(repo => ({
            name: repo.name, 
            updated_at: repo.updated_at
        }));
}

export const getTotalStars = repos => {
    return repos.reduce((total, repo) => total + repo.stargazers_count, 0);
}

async function main() {
    const repos = await getRepos();
    console.log("\n Repos populares");
    console.table(getPopularRepos(repos));
    console.log("\n Repos recientemente actualizados");
    console.table(getUpdatedRepos(repos));
    console.log("\n Total de estrellas:", getTotalStars(repos));
}

main();