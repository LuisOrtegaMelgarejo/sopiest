import { Config } from "./config";
 
export interface ConfigRepository {
    getConfig(configCode: string): Promise<Config>;
    saveConfig(certificate: Partial<Config>): Promise<Config>;
}