import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  createUser(@Body() userDto: UserDTO) {
    return this.userService.createUser(userDto);
  }

  @Get('/all-users')
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get('/get-user/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put('/update-user/:id')
  updateUser(@Param('id') id: string, @Body() userDto: UserDTO) {
    return this.userService.updateUser(id, userDto);
  }

  @Delete('/delete-user/:id')
  deleteUser(@Param('id') id:string){
    return this.userService.deleteUser(id);
  }

}
