import User, { TUser } from '../models/user';
import { HTTP_STATUS, HEAD_CONTENT } from '../utils/constants';
import { findUserIdFromUrl, uuidv4RegExpValidation, onBuildArrayComponent, decodePOSTComponent } from '../utils/utils';

export const putController = async (req, res) => {
    try {
        const body: Buffer[] = []
        req.on('data', async (data) => {
            const id: string = findUserIdFromUrl(req.url)
            const user: any = new User()
            const candidate: object[] = await user.getOne(id)
            const validate: [] = uuidv4RegExpValidation(id)
            if (candidate.length && validate) {
                body.push(Buffer.from(data))
                let obj: TUser = {
                    username: null,
                    hobbies: null,
                    age: null,
                    id: null
                };
                obj = decodePOSTComponent(body.toString())
                const hobbies: string[] = obj.hobbies && onBuildArrayComponent(obj.hobbies)
                await user.saveOne(id, obj.username, obj.age, hobbies)
                const updatedCandidate: object[] = await user.getOne(id)
                res.writeHead(HTTP_STATUS.OK, HEAD_CONTENT);
                res.end(`User was updated :
                ${JSON.stringify(updatedCandidate)}`);
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
        })
    } catch (error) {
        throw error
    }
}