import {
  Param,
  Get,
  Body,
  Controller,
  Post,
  Patch,
  UseInterceptors,
  Session,
  UseGuards,
  // ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dtos/signin-user.dto';
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  // @Get('/colors/:color')
  // setColor(@Param('color') color: string, @Session() session: any) {
  //   session.color = color;
  // }

  // @Get('/getColors')
  // getColors(@Session() session: any) {
  //   return session.color;
  // }
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    console.log('Creating the user...');
    var user = await this.authService.signup(
      body.name,
      body.email,
      body.password,
    );
    session.userID = user.id;
    return user;
  }
  @Post('/signin')
  async signinUser(@Body() body: SignInUserDto, @Session() session: any) {
    console.log('Checking the signin user!');
    var user = await this.authService.signin(body.email, body.password);
    session.userID = user.id;
    return user;
  }
  @Get('/findone/:id')
  async findOne(@Param('id') id: number) {
    console.log('Param: ', id);
    return await this.userService.findOne(id);
  }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  async WhoAmI(@Session() session: any) {
    console.log(session.userID);
    return this.userService.findOne(session.userID);
  }
  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@Session() session: any) {
    session.userID = null;
  }
  @Get('/find/:email')
  async find(@Param('email') email: string) {
    return await this.userService.find(email);
  }

  @Patch('/update/:id')
  async update(@Param('id') id: number, @Body() attr: UpdateUserDto) {
    console.log(id, attr);
    return this.userService.update(id, attr);
  }

  @Get('/remove/:id')
  async remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
