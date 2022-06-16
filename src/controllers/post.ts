import { HTTP_STATUS, HEAD_CONTENT } from '../utils/constants'
import User, { TUser } from '../models/user'
import { decodePOSTComponent, onBuildArrayComponent } from '../utils/utils';

export const postController = (req, res) => {
    try {
        const body: Buffer[] = []
        req.on('data', data => {
            body.push(Buffer.from(data))
            let obj: TUser = {
                username: null,
                hobbies: null,
                age: null,
                id: null
            };
            obj = decodePOSTComponent(body.toString())
            const hobbies: string[] = obj.hobbies && onBuildArrayComponent(obj.hobbies)
            if (!obj.username || !obj.age || !obj.hobbies) {
                res.writeHead(HTTP_STATUS.BAD_RESPONSE, HEAD_CONTENT)
                res.end(`There are not required fileds.Required fileds: ${!obj.username ? 'username' : ''} ${!obj.age ? 'age' : ''} ${!obj.hobbies ? 'hobbies' : ''} `)
            }
            else {
                res.writeHead(HTTP_STATUS.CREATED, HEAD_CONTENT)
                req.on('end', async () => {
                    const user: User = new User(obj.username, +obj.age, hobbies)
                    await user.save()
                })
                res.end(`User was saved on "CRUD-API/data/users.json" base. ${JSON.stringify(obj)} `)
            }
        })
    } catch (error) {
        res.writeHead(HTTP_STATUS.SERVER_ERROR, HEAD_CONTENT);
        res.end(JSON.stringify(`Server Error ${error}`));
    }

}