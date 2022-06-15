import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs'
import * as path from 'path'
import { writeToFile } from '../utils/utils'

export type TUser = {
    username: string,
    age: number,
    hobbies: string[],
    id: string
}
interface IUser {
    username: string,
    age: number,
    hobbies: string[],
    save(): Promise<any>,
    toJSON(): void,
}

class User implements IUser {
    id: string
    constructor(
        public username: string = null,
        public age: number = null,
        public hobbies: string[] = null
    ) {
        this.id = uuidv4();
        this.username = username;
        this.age = age;
        this.hobbies = hobbies;
    }

    public async save(): Promise<any> {
        const users: TUser[] | any = await User.getAll()
        users.push(this.toJSON())
        writeToFile(users)
    }

    public async saveOne(id, name, age, hobbies): Promise<any> {
        const users: TUser[] | any = await User.getAll()
        users.map(item => {
            if (item.id === id) {
                item.username = name ? name : item.username;
                item.age = age ? +age ? +age : 0 : item.age;
                item.hobbies = hobbies ? hobbies : item.hobbies;
            }
        })
        writeToFile(users)
    }

    public async getOne(id: string): Promise<string> {
        const users: TUser[] | any = await User.getAll()
        const one = users.filter(item => item.id === id)
        return one
    }

    public async removeOne(id): Promise<any> {
        const users: TUser[] | any = await User.getAll()
        const newUsers = users.filter(item => {
            item.id !== id
            console.log(item.id)
            console.log(id)
            console.log(item.id === id)
        })
        writeToFile(newUsers)
    }

    public toJSON() {
        return {
            id: this.id,
            username: this.username,
            age: this.age,
            hobbies: this.hobbies
        }
    }

    public static getAll() {
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