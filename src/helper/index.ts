// 
import { map } from 'lodash';

export const mapErrorsValidate = (errors: Array<any>): Object => {
    return map(errors, (i: any, index: any)=> {
        let result: Object = {
            key: i.param,
            name: i.msg,
        };
        return result;
    });
}