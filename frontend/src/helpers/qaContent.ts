import type { QaItem } from "../types/qa";

export const qaItems: QaItem[] = [
    {
        questionKey: "qaSection.questions.housing",
        answerKey: "housing",
    },
    {
        questionKey: "qaSection.questions.gifts",
        answerKey: "gifts",
    },
    {
        questionKey: "qaSection.questions.transport",
        answerKey: "transport",
    },
    {
        questionKey: "qaSection.questions.dressCode",
        answerKey: "dressCode",
    },
    {
        questionKey: "qaSection.questions.usefulLinks",
        answerKey: "usefulLinks",
    },
    {
        questionKey: "qaSection.questions.children",
        answerKey: "children",
    },
];

const markdownModules = import.meta.glob("../content/qa/*/*.md", {
    query: "?raw",
    import: "default",
});

function getLanguageCandidates(language: string) {
    const normalizedLanguage = language.toLowerCase();
    const baseLanguage = normalizedLanguage.split("-")[0];

    return Array.from(new Set([normalizedLanguage, baseLanguage, "no"]));
}

export async function loadQaAnswer(language: string, answerKey: string) {
    for (const candidate of getLanguageCandidates(language)) {
        const path = `../content/qa/${candidate}/${answerKey}.md`;
        const loader = markdownModules[path];

        if (loader) {
            return loader() as Promise<string>;
        }
    }

    throw new Error(`Missing QA markdown file for "${answerKey}" in language "${language}"`);
}
