import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmModule = {
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
      type: 'mysql',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
};