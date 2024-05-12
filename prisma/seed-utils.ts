export const getRandomElement = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

export function getRandomNumber(minOrMax: number, max?: number): number {
    if (!max) {
        return Math.trunc(Math.random() * minOrMax);
    }
    return Math.trunc(Math.random() * (max - minOrMax) + minOrMax);
}

type ConnectItem = {
    connect: {
        id: string
    }
};

export const connectRandom = <T extends { id: string }>(array: T[]): ConnectItem => ({
    connect: {
        id: getRandomElement(array)?.id,
    },
});
