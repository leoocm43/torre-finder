// filepath: [[username].ts](http://_vscodecontentref_/1)
export default defineEventHandler(async (event) => {
  const { username } = event.context.params as { username: string }
  return await $fetch(`https://torre.ai/api/genome/bios/${username}`)
})