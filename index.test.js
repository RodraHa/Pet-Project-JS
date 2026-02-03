import { getPopularRepos, getTotalStars, getUpdatedRepos } from "./index.js";

let repos;

beforeAll(() => {
    repos = [
        { name: 'a', stargazers_count: 10, updated_at: '2024-01-01' },
        { name: 'b', stargazers_count: 2,  updated_at: '2024-01-02' },
        { name: 'c', stargazers_count: 20, updated_at: '2024-01-03' },
        { name: 'd', stargazers_count: 7,  updated_at: '2024-01-04' },
        { name: 'e', stargazers_count: 1,  updated_at: '2024-01-05' },
        { name: 'f', stargazers_count: 50, updated_at: '2024-01-06' }
    ];
});

test("get popular repos", () => {
    const popularRepos = getPopularRepos(repos);
    expect(popularRepos).toEqual([
        { name: 'f', stargazers_count: 50 },
        { name: 'c', stargazers_count: 20 },
        { name: 'a', stargazers_count: 10 },
        { name: 'd', stargazers_count: 7 }
    ]);
});
test("empty popular repos", () => {
    const popularRepos = getPopularRepos();
    expect(popularRepos.length).toBe(0);
});
test("get updated repos", () => {
    const updatedRepos = getUpdatedRepos(repos);
    expect(updatedRepos.length).toBe(5);
    expect(updatedRepos[0].name).toBe('f');
    expect(updatedRepos[4].name).toBe('b');
});
test("empty updated repos", () => {
    const updatedRepos = getUpdatedRepos();
    expect(updatedRepos.length).toBe(0);
});
test("get total stars", () => {
    const totalStars = getTotalStars(repos);
    expect(totalStars).toBe(90);
});
test("empty total stars", () => {
    const totalStars = getTotalStars();
    expect(totalStars).toBe(0);
});