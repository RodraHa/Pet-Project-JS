import { getPopularRepos, getTotalStars, getLatestUpdatedRepos, getRepos, getReposAlphabetical } from "./index.js";

async function main() {
    const repos = await getRepos();
    console.log("\n Popular Repositories (more than 5 stars)");
    console.table(getPopularRepos(repos));
    console.log("\n Recently Updated Repositories (Top 5)");
    console.table(getLatestUpdatedRepos(repos, 5));
    console.log("\n Total Stars:", getTotalStars(repos));
    console.log("\n Top 5 Popular Repositories");
    console.table(getPopularRepos(repos).slice(0, 5));
    console.log("\n Repositories in Alphabetical Order without the ones that start with h");
    console.table(getReposAlphabetical(repos).filter(repo => !repo.name.toLowerCase().startsWith('h')));
}

await main();