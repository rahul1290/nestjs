import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserCreateDto, UserUpdateDto, userListResponse } from '../dtos/User.dto'

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel : Model<UserDocument>){}

    async getAll(): Promise<userListResponse[]> {
        try {
            const users = await this.userModel.find({isActive:true}).lean().exec()
            return users.map(user => new userListResponse(user));
        } catch (error) {
            console.log("getAll error", error);
            throw error
        }   
    }

    async getUserDetail(userId: string): Promise<userListResponse> {
        try {
            const users = await this.userModel.findOne({_id:userId,isActive:true}).lean().exec()
            return new userListResponse(users);
        } catch (error) {
            console.log("getAll error", error);
            throw error
        }   
    }

    async findByEmail(userMail: string): Promise<userListResponse> {
        try {
            const users = await this.userModel.findOne({email:userMail,isActive:true}).lean().exec()
            return new userListResponse(users);
        } catch (error) {
            console.log("getAll error", error);
            throw error
        }   
    }

    async createUser(userData : UserCreateDto){
        try {
         const user = await this.userModel.create(userData)
         return user
        } catch (error) {
            console.log("createUser error", error);
            throw error
        }
    }

    async updateUser(userId: String, userData : UserUpdateDto){
        try {
         const user = await this.userModel.findOneAndUpdate({_id:userId},userData,{ new: true })
         return user
        } catch (error) {
            console.log("updateUser error", error);
            throw error
        }
    }

    async activateUser(userId : String){
        try {
            const userData = this.userModel.findOneAndUpdate({_id:userId},{isActive:true},{new: true})
            return userData
        } catch (error) {
            console.log("activateUser error", error);
            throw error
        }
    }

    async deleteUser(userId : String){
        try {
            const userData = this.userModel.findOneAndUpdate({_id:userId},{isActive:false},{new: true})
            return userData
        } catch (error) {
            console.log("activateUser error", error);
            throw error
        }
    }
}
