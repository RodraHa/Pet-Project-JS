import { getPopularRepos, getTotalStars, getUpdatedRepos, getRepos } from "./index.js";

async function main() {
    const repos = await getRepos();
    console.log("\n Repos populares");
    console.table(getPopularRepos(repos));
    console.log("\n Repos recientemente actualizados");
    console.table(getUpdatedRepos(repos));
    console.log("\n Total de estrellas:", getTotalStars(repos));
}

main();