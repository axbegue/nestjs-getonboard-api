import { format as formatDate } from 'date-fns'

export class DateHelper {
  private currentDate: Date;
  private formatStr: string;

  constructor();
  constructor(date: Date);
  constructor(date?: Date) {
    this.formatStr = 'yyyy-MM-dd';

    if (date !== undefined) {
      this.currentDate = date;
    } else {
      this.currentDate = new Date();
    }
  }

  public date() {
    return this.currentDate;
  }

  public utc() {
    return new Date(Date.UTC(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 
        this.currentDate.getHours(), this.currentDate.getMinutes(), this.currentDate.getSeconds(), this.currentDate.getMilliseconds()));
  }

  public format(): string;
  public format(format: string): string;
  public format(format?: string) {
    if (format !== undefined)
      this.formatStr = format;
    return formatDate(this.currentDate, this.formatStr);
  }

  public resetDate(): DateHelper {
    this.currentDate = new Date();
    return this;
  }

  public setDate(date: Date): DateHelper {
    this.currentDate = date;
    return this;
  }
    
  public firstTimeDay(): DateHelper {
      this.currentDate = DateHelper.getDateWithoutTime(this.currentDate);
      return this;
  }
  
  public lastTimeDay(): DateHelper {
      this.currentDate = DateHelper.getDateLastTime(this.currentDate);
      return this;
  }
  
  public tomorrow(): DateHelper {
      this.currentDate = DateHelper.getTomorrowDate(this.currentDate);
      return this;
  }
    
  public addDays(days: number): DateHelper {
      this.currentDate = DateHelper.addDays(this.currentDate, days);
      return this;
  }
  
  public addHours(hours: number): DateHelper {
      this.currentDate = DateHelper.addHours(this.currentDate, hours);
      return this;
  }
  
  public addMinutes(minutes: number): DateHelper {
      this.currentDate = DateHelper.addMinutes(this.currentDate, minutes);
      return this;
  }
  
  public addSeconds(seconds: number): DateHelper {
      this.currentDate = DateHelper.addSeconds(this.currentDate, seconds);
      return this;
  }




  
    
    
  public static addDays(date: Date, days: number): Date {
    const fechaActual = new Date(date.getFullYear(), date.getMonth(), date.getDate()+days, 
        date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    return fechaActual;
  }
  
  public static addHours(date: Date, hours: number): Date {
    const fechaActual = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 
        date.getHours()+hours, date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    return fechaActual;
  }
  
  public static addMinutes(date: Date, minutes: number): Date {
    const fechaActual = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 
        date.getHours(), date.getMinutes()+minutes, date.getSeconds(), date.getMilliseconds());
    return fechaActual;
  }
  
  public static addSeconds(date: Date, seconds: number): Date {
    const fechaActual = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 
        date.getHours(), date.getMinutes(), date.getSeconds()+seconds, date.getMilliseconds());
    return fechaActual;
  }

  public static getDateWithoutTime(date: Date): Date {
    const fechaActual = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    return fechaActual;
  }

  public static getDateLastTime(date: Date): Date {
    const fechaActual = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 59);
    return fechaActual;
  }

  public static getTomorrowDate(date: Date): Date {
    const fechaActual = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1, 0, 0, 0, 0);
    return fechaActual;
  }
}
