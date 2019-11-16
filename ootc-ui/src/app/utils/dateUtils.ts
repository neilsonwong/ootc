import * as moment from 'moment';

export function nowOrStartOfSeason(): moment.Moment {
    const now = moment.utc();
    const seasonStart = moment.utc(`${now.month() > 5 ? now.year() + 1 : now.year()}-01-21`, 'YYYY-MM-DD');
    return moment.max(now, seasonStart);
}
