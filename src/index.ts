import * as http from 'http';
import 'dotenv/config'
import { PORT } from './utils/utils';
import {
    deleteController,
    getALLController,
    getOneController,
    putController,
    postController
} from './controllers';


const server = http.createServer(async (req, res) => {
    const { POST_ROUTE, GET_ALL_ROUTE } = process.env
    console.log(req.url)
    if (req.method === 'POST' && req.url === POST_ROUTE) {
        postController(req, res)
    }
    if (req.method === 'GET') {
        if (req.url === GET_ALL_ROUTE) {
            console.log('a')
            getALLController(req, res)
        }
        if (req.url.startsWith(GET_ALL_ROUTE) && req.url !== GET_ALL_ROUTE) {
            getOneController(req, res)
        }
    }
    if (req.method === 'PUT' && req.url.startsWith(GET_ALL_ROUTE)) {
        putController(req, res)
    }
    if (req.method === 'DELETE' && req.url.startsWith(GET_ALL_ROUTE)) {
        deleteController(req, res)
    }
})


server.listen(PORT, () => console.log(`Server running on port ${PORT} `))