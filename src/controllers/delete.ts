
import User from '../models/user';
import { HTTP_STATUS, HEAD_CONTENT } from '../utils/constants';
import { findUserIdFromUrl, uuidv4RegExpValidation, onBuildArrayComponent, decodePOSTComponent } from '../utils/utils';

export const deleteController = async (req, res) => {
    try {
        let id: string = findUserIdFromUrl(req.url)
        const user: any = new User()
        const candidate: object[] = await user.getOne(id)
        const validate: string[] = uuidv4RegExpValidation(id)
        if (candidate.length && validate) {
            await user.removeOne(id)
            res.writeHead(HTTP_STATUS.DELETED, HEAD_CONTENT);
            res.end(JSON.stringify(`User was removed :
                ${candidate}`));
        }
        if (!candidate.length) {
            if (validate) {
                res.writeHead(HTTP_STATUS.NOT_FOUND, HEAD_CONTENT);
                res.end(JSON.stringify(`${id} is valid, but user doesn't exist with this id`));
            }
            else {
                res.writeHead(HTTP_STATUS.BAD_RESPONSE, HEAD_CONTENT);
                res.end(JSON.stringify(`${id} is not vaild`));
            }
        }

    } catch (error) {
        res.writeHead(HTTP_STATUS.SERVER_ERROR, HEAD_CONTENT);
        res.end(JSON.stringify(`Server Error ${error}`));
    }
}