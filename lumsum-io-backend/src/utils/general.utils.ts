export const URL = "http://localhost:4000/images/";

export const getLimitOffset: TGetLimitOffset = (limit = 20, offset = 0) => {
    return({
        offset,
        limit
    })
}