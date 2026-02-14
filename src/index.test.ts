import { getPopularRepos, getTotalStars, getLatestUpdatedRepos, getReposAlphabetical } from "./index.js";
import type { GitHubRepository } from "./index.js";

const repos: GitHubRepository[] = [
    { name: 'a', stargazers_count: 10, updated_at: '2024-01-01' },
    { name: 'b', stargazers_count: 2,  updated_at: '2024-01-02' },
    { name: 'c', stargazers_count: 20, updated_at: '2024-01-03' },
    { name: 'd', stargazers_count: 7,  updated_at: '2024-01-04' },
    { name: 'e', stargazers_count: 1,  updated_at: '2024-01-05' },
    { name: 'f', stargazers_count: 50, updated_at: '2024-01-06' }
];

describe("GitHub Repository Functions", () => {
    describe("getPopularRepos", () => {
        test("should get repos with more than 5 stars", () => {
            const popularRepos = getPopularRepos(repos);
            expect(popularRepos).toEqual([
                { name: 'f', stargazers_count: 50, updated_at: '2024-01-06' },
                { name: 'c', stargazers_count: 20, updated_at: '2024-01-03' },
                { name: 'a', stargazers_count: 10, updated_at: '2024-01-01' },
                { name: 'd', stargazers_count: 7, updated_at: '2024-01-04' }
            ]);
        });

        test("should return an empty array when no popular repos", () => {
            const popularRepos = getPopularRepos([]);
            expect(popularRepos.length).toBe(0);
        });
    });

    describe("getLatestUpdatedRepos", () => {
        test("should get the top 5 recently updated repos", () => {
            const updatedRepos = getLatestUpdatedRepos(repos, 5);
            expect(updatedRepos.length).toBe(5);
            expect(updatedRepos.map(repo => repo.name)).toEqual(['f', 'e', 'd', 'c', 'b']);
        });

        test("should return an empty array when no updated repos", () => {
            const updatedRepos = getLatestUpdatedRepos([]);
            expect(updatedRepos.length).toBe(0);
        });

        test("should return an empty array when topN is less than or equal to 0", () => {
            const updatedRepos = getLatestUpdatedRepos(repos, 0);
            expect(updatedRepos.length).toBe(0);
        });
    });

    describe("getTotalStars", () => {
        test("should get the total stars", () => {
            const totalStars = getTotalStars(repos);
            expect(totalStars).toBe(90);
        });

        test("should return 0 when no repos", () => {
            const totalStars = getTotalStars([]);
            expect(totalStars).toBe(0);
        });
    });

    describe("getReposAlphabetical", () => {
        test("should get the repos in alphabetical order", () => {
            const alphabeticalRepos = getReposAlphabetical(repos);
            expect(alphabeticalRepos.map(repo => repo.name)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
        });

        test("should return an empty array when no repos for alphabetical sorting", () => {
            const alphabeticalRepos = getReposAlphabetical([]);
            expect(alphabeticalRepos.length).toBe(0);
        });
    });
});

