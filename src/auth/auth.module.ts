import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRepository } from './repositories/auth.repository';
import { AuthResolver } from './auth.resolver';
import { User } from 'src/user/database/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtTokenServices } from './jwt/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { RtStrategy } from './strategies/rt.strategy';
import { Status } from 'src/user/database/status.entity';
import { Role } from 'src/role/database/role.entity';

@Module({
  // controllers: [AuthController],
    imports: [
      TypeOrmModule.forFeature([User,Status,Role]),
      JwtModule.register({})
    ],
    
  
  providers: [AuthService , AuthRepository ,AuthResolver ,JwtTokenServices ,RtStrategy],
})
export class AuthModule {}
