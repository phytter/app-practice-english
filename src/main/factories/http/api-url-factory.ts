export const makeApiUrl = (path: string): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
  return `${apiUrl}${path}`
}