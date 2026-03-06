import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Seeding database...');

    // Upsert profile (update if exists, insert if not)
    const profile = await prisma.profile.upsert({
        where: { id: 1 },
        update: {},
        create: {
            fullName: 'Mukarram Mahmoud',
            title: 'Full Stack Developer',
            bio: 'Passionate developer building modern web apps.',
            cvUrl: 'https://example.com/cv.pdf',
            socialLinks: {
                github: 'https://github.com/mukarrammahmoud',
                linkedin: 'https://linkedin.com/in/mukarrammahmoud',
            },
        },
    });

    console.log('✅ Profile seeded:', profile);
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await pool.end();
    });
