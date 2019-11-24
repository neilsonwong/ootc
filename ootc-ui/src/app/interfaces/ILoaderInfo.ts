import { LoadState } from '../constants/load-state.enum';

export interface ILoaderInfo {
    title?: string;
    text?: string;
    state: LoadState
}
