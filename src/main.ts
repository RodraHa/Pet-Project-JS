import { getPopularRepos, getTotalStars, getUpdatedRepos, getRepos } from "./index.js";

async function main() {
    const repos = await getRepos();
    console.log("\n Popular Repositories (more than 5 stars)");
    console.table(getPopularRepos(repos));
    console.log("\n Recently Updated Repositories (Top 5)");
    console.table(getUpdatedRepos(repos));
    console.log("\n Total Stars:", getTotalStars(repos));
}

main();