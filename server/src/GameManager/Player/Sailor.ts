import { generateId } from '../../utils/utils';
export class Sailor {
    id: number = generateId();
    type: TSailorType = 'none';
}
