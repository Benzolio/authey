import { URL } from 'node:url'
import * as dotenv from 'dotenv'
import express from 'express'
import { createAuthMiddleware } from 'auth-universal'
import type { AuthOptions } from '@auth/core'
import GithubProvider from '@auth/core/providers/github'
dotenv.config()

const app = express()

const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
}

app.use(createAuthMiddleware(authOptions))
app.use(express.static(new URL('./public', import.meta.url).pathname))

app.get('/', (req, res) => {
  res.render('index.html')
})

app.listen(3000, () => {
  console.log('server started on port 3000...')
})
