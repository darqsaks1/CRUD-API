import 'dotenv/config'
import * as fs from 'fs'
import * as path from 'path'

export const decodePOSTComponent = (body: string) => {
    const obj: any = {}
    const string: string = decodeURIComponent(body);
    const arr: string[] = string.split('&');
    arr.forEach(el => {
        const a: string[] = el.split('=')
        obj[a[0]] = a[1];
    });
    return obj
}

export const onBuildArrayComponent = (hobbies) => {
    return hobbies && hobbies.split(',').map(item => item.trim())
}

export const PORT: string | number = process.env.PORT || 5000;

export const findUserIdFromUrl = (url: string) => {
    const array = url.split('/')
    const id = array[array.length - 1]
    return id
}


export const uuidv4RegExpValidation = (id) => {
    return id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
}


export const writeToFile = async (item) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            path.join(__dirname, '..', 'data', 'users.json'),
            JSON.stringify(item),
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