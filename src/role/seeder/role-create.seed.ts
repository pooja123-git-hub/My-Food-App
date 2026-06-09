import { Seeder } from "typeorm-seed-data";
import { Role } from "../database/role.entity";

export class RoleCreateSeeder implements Seeder {
    public async run(factory: any, dataSource: any): Promise<void> {
         const data =[
            {
                name:"Admin",
                is_admin:true,
                created_at: new Date(),
                updated_at: new Date(),
                permissions :[]
           },
           {
            name:"User",
            is_admin:false,
            created_at: new Date(),
            updated_at: new Date(),
            permissions :[
                "login",
                "register"
            ]
           }
         ]
         for(let i = 0; i < data.length; i++) {
             const roleRepository = dataSource.getRepository(Role);
           
           const roleExist = await roleRepository.findOne({
             where: { name: data[i].name }
           });
            if(roleExist) {
                roleExist.name = data[i].name;
                roleExist.is_admin = data[i].is_admin;
                roleExist.updated_at = new Date();
                roleExist.permissions = data[i].permissions;
                await dataSource.createQueryBuilder().update(Role).set(roleExist).where("id = :id", { id: roleExist.id }).execute();

            } else {
                await dataSource.createQueryBuilder().insert().into(Role).values(data[i]).execute();
            }

    }
}
}
