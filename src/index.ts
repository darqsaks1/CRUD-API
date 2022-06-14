import * as http from 'http';
import 'dotenv/config'
import { postController } from './controllers/post';
import { PORT } from './utils/utils';


const server = http.createServer(async (req, res) => {

    const { POST_ROUTE } = process.env

    if (req.method === 'POST' && req.url === POST_ROUTE) {
        postController(req, res)
    }
})


server.listen(PORT, () => console.log(`Server running on port ${PORT} `))