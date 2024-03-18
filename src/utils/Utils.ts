/** 模拟休眠 */
const sleep = (times: number): Promise<void> => {
    return new Promise(resolve => setTimeout(() => resolve(), times));
}

export {
    sleep,
}
