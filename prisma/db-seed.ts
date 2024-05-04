import {faker} from '@faker-js/faker';
import {PrismaClient} from '@prisma/client';
import * as Sentry from '@sentry/nextjs';

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

async function seedDb() {
    await generateMedia(50)
    await generateUsers(50);
    await generateProducts(50);
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