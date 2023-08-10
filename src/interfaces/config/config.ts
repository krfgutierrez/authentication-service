import IConfigDatabase from "./config_database";
import IConfigSecurity from "./config_security";

export default interface IConfig {
  database: IConfigDatabase;
  security: IConfigSecurity;
}