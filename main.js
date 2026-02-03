import { getPopularRepos, getTotalStars, getUpdatedRepos, getRepos } from "./index.js";

async function main() {
    const repos = await getRepos();
    console.log("\n Popular Repositories");
    console.table(getPopularRepos(repos));
    console.log("\n Recently Updated Repositories");
    console.table(getUpdatedRepos(repos));
    console.log("\n Total Stars:", getTotalStars(repos));
}

main();