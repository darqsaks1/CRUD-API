import * as http from 'http';
import 'dotenv/config'
import User from './models/user'

const PORT: string | number = process.env.PORT;

const server = http.createServer(async (req, res) => {
    const { POST_API } = process.env
    console.log(req.method)
    console.log(req.url)

    if (req.method === 'POST') {
        if (req.url === POST_API) {
            res.writeHead(200, {
                'Content-Type': 'text/json'
            })
            const body = []
            req.on('data', data => {
                body.push(Buffer.from(data))
            })

            req.on('end', () => {
                const message = body
                console.log(message)
            })
            const user: User = new User('e', 13, ['aa'])
            await user.save()
            // console.log('a')
            // console.log(req.url)
            res.end('Thanks')
        }
    }
})


server.listen(PORT, () => console.log(`Server running on port ${PORT}`))