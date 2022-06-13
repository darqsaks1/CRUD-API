import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs'
import * as path from 'path'

type TUser = {
    username: string,
    age: number,
    hobbies: string[],
    id: string
}
interface IUser {
    username: string,
    age: number,
    hobbies: string[],
    save(): Promise<any>
}

class User implements IUser {
    id: string
    constructor(public username: string, public age: number, public hobbies: string[]) {
        this.username = username;
        this.age = age;
        this.hobbies = hobbies;
        this.id = uuidv4();
    }

    async save(): Promise<any> {
        const users: TUser[] | any = await User.getAll()

        users.push(this.toJSON())
        return new Promise((resolve, reject) => {
            console.log('USERS', users)
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'users.json'),
                JSON.stringify(users),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(true)
                    }
                }

            )
        })
    }

    toJSON() {
        return JSON.stringify({
            username: this.username,
            age: this.age,
            hobbies: this.hobbies,
            id: this.id
        })
    }
    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'users.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(JSON.parse(content))
                    }
                }
            )
        })

    }
}

export default User