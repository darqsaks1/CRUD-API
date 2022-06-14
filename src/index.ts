import * as http from 'http';
import 'dotenv/config'
import User from './models/user'
import { decodePOSTComponent, onBuildArrayComponent } from './utils/utils';

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
            const body: any[] = []
            req.on('data', data => {
                body.push(Buffer.from(data))
            })
            let obj: any = {};
            req.on('end', async () => {
                obj = decodePOSTComponent(body.toString())
                console.log(decodePOSTComponent(body.toString()), "ENCODED")
                const hobbies = onBuildArrayComponent(obj.hobbies)
                const user: User = new User(obj.username, +obj.age, hobbies)
                await user.save()
            })


            // console.log('a')
            // console.log(req.url)
            res.end('Thanks')
        }
    }
})


server.listen(PORT, () => console.log(`Server running on port ${PORT}`))