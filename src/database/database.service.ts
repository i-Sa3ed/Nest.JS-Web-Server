import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient 
implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
        //^ Inherited from 'PrismaClient'
        // It initiates the database connection using the configuration provided in the Prisma schema file.
    }
}
