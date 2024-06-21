import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios-adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,

    private readonly httpAdapter: AxiosAdapter,
  ) {}

//private readonly axios: AxiosInstance = axios;
  
  async executeSeed() {

    this.pokemonModel.deleteMany({}).exec();

    //const insertPromises = []
    const pokemonToinsert: {no: number, name: string}[] = [];
    //dependencia del servicio
    const data = await this.httpAdapter.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=500')

    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      //this.pokemonModel.create({no, name});

      /*insertPromises.push(
        this.pokemonModel.create({no, name})
      )¨*/

      pokemonToinsert.push({no, name});
    })
    //await Promise.all(insertPromises);
    await this.pokemonModel.insertMany(pokemonToinsert);

    return data.results;
  }

}
