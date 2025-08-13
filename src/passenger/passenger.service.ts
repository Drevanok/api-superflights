import { Injectable } from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { IPassenger } from './interfaces/passenger.interface';
import { PASSENGER } from 'src/common/models/models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PassengerService {

     constructor(@InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>) {}

    async createPassenger(passengerDto: PassengerDTO): Promise<IPassenger>{
        const { email } = passengerDto;

        const emailExists = await this.model.findOne({email});
        if(emailExists){
            throw new Error('this passenger already exists');
        }
        
        const passenger = new this.model(passengerDto);
        return await passenger.save();
    }
}
