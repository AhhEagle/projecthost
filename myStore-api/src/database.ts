import dotenv from 'dotenv';
import {Pool} from 'pg';

dotenv.config();



const{POSTGRES_HOST,POSTGRES_USER, POSTGRES_DB_TEST, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, ENV} = process.env;


  const pool:Pool = new Pool ({
    host: POSTGRES_HOST,
    database: ENV === 'dev' ? POSTGRES_DB:POSTGRES_DB_TEST,
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD,
    port:parseInt (POSTGRES_PORT as string)
});




/*host: POSTGRES_HOST,
database:POSTGRES_DB,
user:POSTGRES_USER,
password:POSTGRES_PASSWORD

host: POSTGRES_HOST,
database:POSTGRES_DB_TEST,
user:POSTGRES_USER_TEST,
password:POSTGRES_PASSWORD_TEST
*/ 

export default pool;