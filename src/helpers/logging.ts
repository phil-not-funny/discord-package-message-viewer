export interface Logger {
  success(message: string): void;
  info(message: string): void;
  error(message: string): void;
}

export class BackendLogger implements Logger {
  info(message: string): void {
    console.log(`\x1b[33m[BACKEND - info]\x1b[0m: ${message}`);
  }
  success(message: string) {
    console.log(`\x1b[32m[BACKEND - success]\x1b[0m: ${message}`);
  }
  error(message: string): void {
    console.error(`\x1b[31m[BACKEND - error]\x1b[0m: ${message}`);
  }
}

export class FrontendLogger implements Logger {
  info(message: string): void {
    console.log(`\x1b[33m[FRONTEND - info]\x1b[0m: ${message}`);
  }
  success(message: string) {
    console.log(`\x1b[32m[FRONTEND - success]\x1b[0m: ${message}`);
  }
  error(message: string): void {
    console.error(`\x1b[31m[FRONTEND - error]\x1b[0m: ${message}`);
  }
}

export const BACKEND: BackendLogger = new BackendLogger();
export const FRONTEND: FrontendLogger = new FrontendLogger();
