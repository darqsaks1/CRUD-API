export const decodePOSTComponent = (body: string) => {
    const obj: any = {}
    const string = decodeURIComponent(body);
    const arr = string.split('&');
    arr.forEach(el => {
        const a = el.split('=')
        obj[a[0]] = a[1];
    });
    return obj
}

export const onBuildArrayComponent = (hobbies) => {
    return hobbies.split(',').map(item => item.trim())
}