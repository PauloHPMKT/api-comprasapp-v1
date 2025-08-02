export interface EnvConfig {
  getEnv<T = string>(env: string): T;
}
