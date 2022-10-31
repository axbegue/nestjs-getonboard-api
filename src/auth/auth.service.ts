import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UserService } from '../user/user.service';
import { User } from 'src/user/models';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ email });

    if (user && (await compare(pass, user.password))) {
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }

  login(user: User) {
    console.log(user);
    
    const { id, ...rest } = user;
    const payload = {
      // username: email,
      sub: id
    };

    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
