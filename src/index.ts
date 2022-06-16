import * as http from 'http';
import 'dotenv/config';
import {
  deleteController,
  getALLController,
  getOneController,
  putController,
  postController,
} from './controllers';
import { HEAD_CONTENT, HTTP_STATUS } from './utils/constants';

export const server = http.createServer(async (req, res) => {
  const { POST_ROUTE, GET_ALL_ROUTE } = process.env;
  if (req.method === 'POST' && req.url === POST_ROUTE) {
    postController(req, res);
  } else if (req.method === 'GET') {
    if (req.url === GET_ALL_ROUTE) {
      getALLController(req, res);
    }
    if (req.url.startsWith(GET_ALL_ROUTE) && req.url !== GET_ALL_ROUTE) {
      getOneController(req, res);
    }
  } else if (req.method === 'PUT' && req.url.startsWith(GET_ALL_ROUTE)) {
    putController(req, res);
  } else if (req.method === 'DELETE' && req.url.startsWith(GET_ALL_ROUTE)) {
    deleteController(req, res);
  } else {
    res.writeHead(HTTP_STATUS.NOT_FOUND, HEAD_CONTENT);
    res.end(JSON.stringify('No exsist route'));
  }
});

