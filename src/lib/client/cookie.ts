// Call our svelte api endpoint to set cookie for the titeeni domain
export const setCookie = async () => {
  await fetch('/api/setCookie', {
    credentials: 'include'
  })
}
