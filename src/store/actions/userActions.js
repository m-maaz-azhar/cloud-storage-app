const UPDATE_USER_TYPE = 'UPDATE_USER_TYPE';

export const updateUser = (data) => {
    return {
        type: UPDATE_USER_TYPE,
        payload: data,
    };
};