export const config = {
    headers: {
        'Content-Type': 'application/json',
    }
};

export const secureConfig = (username: string, password: string) => {
    return {
        headers: {
            'Content-Type': 'application/json',
        },
        auth:{
            username: username,
            password: password,
        }
    }
}