import { IBlockedTime } from './IBlockedTime';

export interface IGroupedBlockedTimes {
    [s: string]: IBlockedTime[];
}
