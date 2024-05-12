import {faker} from '@faker-js/faker';
import {PrismaClient} from '@prisma/client';
import * as Sentry from '@sentry/nextjs';
import {connectRandom, getRandomNumber} from "../prisma/seed-utils";

const db = new PrismaClient();

const generateUsers = async (count: number) => {
    for (let i = 0; i < count; i++) {
        await db.user.create({
            data: {
                email: faker.internet.email(),
                name: faker.person.firstName(),
            },
        })
    }
};

const generateProducts = async (count: number) => {
    const media = await db.media.findMany()
    for (let i = 0; i < count; i++) {
        await db.product.create({
            data: {
                name: faker.commerce.product(),
                brand: faker.commerce.product(),
                price: Math.trunc(Math.random() * 1000),
                description: faker.commerce.productDescription(),
                article: Math.random().toString(),
                preview: {
                    connect: {
                        id: media[Math.floor(Math.random() * media.length)].id,
                    }
                },
                // gallery: {
                //
                // }
            },
        })
    }
};

const generateMedia = async (count: number) => {
    for (let i = 0; i < count; i++) {
        await db.media.create({
            data: {
               path: faker.image.urlPicsumPhotos(),
            },
        })
    }
};

const generateOrders = async (count: number) => {
    const products = await db.product.findMany()
    const users = await db.user.findMany()
    for (let i = 0; i < count; i++) {
        await db.order.create({
            data: {
                product: connectRandom(products),
                user: connectRandom(users),
                count: getRandomNumber(5)
            },
        })
    }
};

const generateCarts = async (count: number) => {
    const products = await db.product.findMany()
    const users = await db.user.findMany()
    for (let i = 0; i < count; i++) {
        await db.cart.create({
            data: {
                product: connectRandom(products),
                user: connectRandom(users),
                count: getRandomNumber(1, 5)
            },
        })
    }
};

async function seedDb() {
    await generateMedia(50)
    await generateUsers(20);
    await generateProducts(50);
    await generateOrders(100);
    await generateCarts(100);
}

seedDb()
    .then(async () => {
        await db.$disconnect();
    })
    .catch(async (e) => {
        Sentry.captureException(e);
        console.error(e);
        await db.$disconnect();
        process.exit(1);
    });
