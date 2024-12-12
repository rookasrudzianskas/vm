export const languages = [
  {
    code: 'en',
    name: 'English',
  },
  {
    code: 'es',
    name: 'Spanish',
  },
  {
    code: 'fr',
    name: 'French',
  },
  {
    code: 'de',
    name: 'German',
  },
  {
    code: 'it',
    name: 'Italian',
  },
  {
    code: 'pt',
    name: 'Portuguese',
  },
  {
    code: 'lt',
    name: 'Lithuanian',
  }
]

export const languagesMap = languages.map((language) => ({
  [language.code]: language.name,
}))
