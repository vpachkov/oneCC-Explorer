export function getTime(): number {
    return Math.round((new Date()).getTime() / 1000)
}