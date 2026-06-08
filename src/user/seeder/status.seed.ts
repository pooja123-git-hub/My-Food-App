import { Factory, Seeder } from "typeorm-seed-data";
import { Status } from "../database/status.entity";
import { Connection, DataSource } from 'typeorm';


export class StatusSeed implements Seeder {
    public async run(factory : Factory, dataSource : DataSource) {
        const data =[{
            name: "Active",
            created_at: new Date(),
            updated_at: new Date(),
        },  {
            name: "Inactive",
            created_at: new Date(),
            updated_at: new Date(),
        }];

 for(let i = 0; i < data.length; i++) {
    const statusRepository = dataSource.getRepository(Status);

const statusExist = await statusRepository.findOne({
  where: { name: data[i].name }
});
    if (!statusExist) {
        await dataSource.createQueryBuilder().insert().
        into(Status).values(data[i]).execute();
    }else {
        statusExist.name = data[i].name;
        statusExist.updated_at =new Date(Date.now());
        await dataSource.createQueryBuilder().update(Status).set(statusExist).where("id = :id", { id: statusExist.id }).execute();  
    }
}
    }
}