export default class Logger {
  public static log = (args: any) => this.info(args);
  public static info = (args: any) =>
    console.log(new Date().toLocaleString(), " [INFO] ", args);
  public static warn = (args: any) =>
    console.warn(new Date().toLocaleString(), " [WARNING] ", args);
  public static error = (args: any) =>
    console.error(new Date().toLocaleString(), " [ERROR] ", args);
}
