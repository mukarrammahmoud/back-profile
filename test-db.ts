import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

async function main() {
    console.log('DB URL:', process.env.DATABASE_URL);
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    try {
        const profile = await prisma.profile.findFirst();
        console.log('Profile:', JSON.stringify(profile, null, 2));
    } catch (err: any) {
        console.error('Prisma error:', err.message);
    } finally {
        await pool.end();
    }
}
main();
