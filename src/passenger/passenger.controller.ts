import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/passenger')
export class PassengerController {

    constructor(private readonly passengerService: PassengerService){}

    @Post('/create')
    createPassenger(@Body() passengerDto: PassengerDTO){
        return this.passengerService.createPassenger(passengerDto);
    }

    @Get('/get-all-passengers')
    getAllPassengers(){
        return this.passengerService.getAllPassengers();
    }

    @Get('/get-passenger/:id')
    getPassengerById(@Param('id') id: string){
        return this.passengerService.getPassengerById(id);
    }

    @Put('/update-passenger/:id')
    updatePassenger(@Param('id') id: string, @Body() passengerDto : PassengerDTO){
        return this.passengerService.updatePassenger(id, passengerDto);
    }

    @Delete('/delete-passenger/:id')
    deletePassenger(@Param('id') id: string){
        return this.passengerService.deletePassenger(id);
    }
}
