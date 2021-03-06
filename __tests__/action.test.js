import addUser, {SET_USER, REMOVE_USER, removeUser} from '../src/actions/user';
import addSearch, {SET_SEARCH, REMOVE_SEARCH, removeSearch} from '../src/actions/search';

describe('Actions', () => {
    it('should add user', () => {
        const text = 'Some User';
        const expectedAction = {
            type: SET_USER,
            name: text,
        };
        expect(addUser(text)).toEqual(expectedAction)
    });

    it('should add search result', () => {
        const keyword = 'search';
        const result = [];
        const expectedAction = {
            type: SET_SEARCH,
            keyword: keyword,
            result: result,
        };
        expect(addSearch(keyword, result)).toEqual(expectedAction)
    });

    it('should remove search result', () => {
        const expectedAction = {
            type: REMOVE_SEARCH,
        };
        expect(removeSearch()).toEqual(expectedAction)
    });

    it('should remove user result', () => {
        const expectedAction = {
            type: REMOVE_USER,
        };
        expect(removeUser()).toEqual(expectedAction)
    });
});