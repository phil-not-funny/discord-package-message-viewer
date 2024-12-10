export interface Logger {
  success(message: string): void;
  info(message: string): void;
  error(message: string): void;
}

class LoggerImpl implements Logger {
  name: string;
  constructor(name: string) {
    this.name = name.toUpperCase();
  }

  info(message: string): void {
    console.log(`\x1b[33m[${this.name} - info]\x1b[0m: ${message}`);
  }
  success(message: string) {
    console.log(`\x1b[32m[${this.name} - success]\x1b[0m: ${message}`);
  }
  error(message: string): void {
    console.error(`\x1b[31m[${this.name} - error]\x1b[0m: ${message}`);
  }
}

export const BACKEND: LoggerImpl = new LoggerImpl("backend");
export const FRONTEND: LoggerImpl = new LoggerImpl("frontend");
