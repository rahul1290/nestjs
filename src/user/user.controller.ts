import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import {UserService} from './user.service'
import { UserCreateDto, UserUpdateDto, userListResponse } from 'src/user/dto/User.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @Get('')
    @UseInterceptors(ClassSerializerInterceptor)
    async getAllUsers() {
        try {
            const userdata = await this.userService.getAll()
            if(userdata){
                return {'status':200,'msg':"user list",'data':userdata}
            } else {
                return {'status':500,'msg':"user not found",'data':[]}
            }
        } catch (error) {
            return error
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:id')
    async getUser(@Param('id')id: string) {
        try {
            const userdata = await this.userService.getUserDetail(id)
            if(userdata){
                return {'status':200,'msg':"user detail",'data':userdata}
            } else {
                return {'status':500,'msg':"user not found",'data':[]}
            }
        } catch (error) {
            return error
        }
    }

    @Post('')
    async createUser(@Body() userData : UserCreateDto){
        try {
            const userdata = await this.userService.createUser(userData)
            if(userdata){
                return {'status':200,'msg':"user created successfully",'data':userdata}
            } else {
                return {'status':500,'msg':"user not created",'data':[]}
            }
        } catch (error) {
            return error
        }
    }

    @Patch("/:id")
    async updateUser(@Param('id') id : String, @Body() userData : UserUpdateDto){
        try {
            const userdata = await this.userService.updateUser(id, userData)
            if(userdata){
                return {'status':200,'msg':"user updated successfully",'data':userdata}
            } else {
                return {'status':500,'msg':"user not updated",'data':[]}
            }
        } catch (error) {
            return error
        }
    }

    @Put("/active/:id")
    async activateUser(@Param('id') id : String){
        try {
            const userData = await this.userService.activateUser(id)
            if(userData){
                return {'status':200,'msg':"user activated.",'data':userData}
            } else {
                return {'status':500,'msg':"user not found.",'data':[]}
            }
        } catch (error) {
            return error
        }
    }

    @Delete("/:id")
    async deleteUser(@Param('id') id : String) {
        
        try {
            const userData = await this.userService.deleteUser(id)
            if(userData){
                return {'status':200,'msg':"user de-activated.",'data':userData}
            } else {
                return {'status':500,'msg':"user not found.",'data':[]}
            }
        } catch (error) {
            return error
        }
    }
}
