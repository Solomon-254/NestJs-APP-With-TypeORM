import { Userpost } from "src/userpost/entities/userpost.entity";
import { UserProfile } from "src/userprofile/entities/userprofile.entity";
import { User } from "src/users/entities/user.entity";
import { DataSource } from "typeorm";

export default new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '8047',
    database: 'naki',
    migrations: ['migrations/**'],
    entities: [User, Userpost, UserProfile]

});