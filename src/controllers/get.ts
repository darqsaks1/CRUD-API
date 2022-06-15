import User from '../models/user';
import { HTTP_STATUS, HEAD_CONTENT } from '../utils/constants';
import { findUserIdFromUrl, uuidv4RegExpValidation } from '../utils/utils';

export const getALLController = async (req, res) => {
    try {
        const all = await User.getAll()
        res.writeHead(HTTP_STATUS.OK, HEAD_CONTENT);
        res.end(JSON.stringify(all));
    } catch (error) {
        throw error
    }
}

export const getOneController = async (req, res) => {
    try {
        const id = findUserIdFromUrl(req.url)
        const validate = uuidv4RegExpValidation(id)
        const user = new User()
        const candidate = await user.getOne(id)
        if (candidate.length && validate) {
            res.writeHead(HTTP_STATUS.OK, HEAD_CONTENT);
            res.end(JSON.stringify(candidate));
        }
        if (!candidate.length) {
            if (validate) {
                res.writeHead(HTTP_STATUS.NOT_FOUND, HEAD_CONTENT);
                res.end(`${id} is valid, but user doesn't exist with this id`);
            }
            else {
                res.writeHead(HTTP_STATUS.BAD_RESPONSE, HEAD_CONTENT);
                res.end(`${id} is not vaild`);
            }
        }
    } catch (error) {
        throw error
    }
}