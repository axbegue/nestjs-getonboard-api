import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { TYPEORM_CONFIG } from './config/constants';
import { UserModule } from './user/user.module';
import databaseConfig from './config/database.config'
import { AuthModule } from './auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<TypeOrmModuleOptions>(TYPEORM_CONFIG),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, databaseConfig],
    }),
    AccessControlModule.forRoles(roles),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
