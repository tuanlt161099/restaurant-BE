import fs from 'fs';
import momentTimezone from 'moment-timezone';
import { Duplex } from 'stream';
import ENV from './env';

class Util {
  public formatDate(theDateTime?: Date | string | number, format = 'DD/MM/YYYY h:mm:ss a') {
    if (theDateTime)
      return momentTimezone(momentTimezone.utc(theDateTime))
        .tz(ENV.MOMENT_TIMEZONE)
        .locale(ENV.MOMENT_LOCALE)
        .format(format);
    else return '';
  }
}

const util = new Util();

export default util;
