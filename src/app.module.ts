import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // để mọi nơi đều dùng được config
      envFilePath: '.env', // mặc định cũng là .env
      load: [],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        host: config.get('DB_HOST'),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        port: +(config.get<number>('DB_PORT') ?? 5432),
        username: config.get('DB_USERNAME') ?? 'postgres',
        password: config.get('DB_PASSWORD') ?? 'password',
        database: config.get('DB_DATABASE') ?? 'mydb',

        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
