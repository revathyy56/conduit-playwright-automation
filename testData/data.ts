// Glue file: combines .env (where/who) with .json (what to test with), adds types
import articleData from './articles.json'

export type Article = { title: string, about: string, body: string, tag: string }

function required(name: string): string {
    const value = process.env[name]
    if (!value) throw new Error(`Missing env variable: ${name}`)
    return value
}

export const env = {
    baseUrl: process.env.CONDUIT_BASE_URL ?? 'https://conduit.bondaracademy.com',
    email: required('CONDUIT_EMAIL'),
    password: required('CONDUIT_PASSWORD'),
}

export const articles: Article[] = articleData.articles
