import { useLocation, useRouteMatch } from "react-router-dom";

interface IUsePrepareLinks {
    to: string;
    isRelativePath?: boolean;
    query?: Object;
    pushToQuery?: Object;
    hash?: any;
    keepOldQuery?: boolean;
    state?: Object;
}

export default ({
    to,
    isRelativePath = false,
    query = {},
    pushToQuery = {},
    hash,
    keepOldQuery = false,
    state = {},
}: IUsePrepareLinks) => {
    const location = useLocation();
    const match = useRouteMatch();

    let pathname;

    if (match && isRelativePath) {
        pathname = match.url + to;
    } else {
        pathname = to || location.pathname;
    }

    const newQuery = keepOldQuery
        ? new URLSearchParams(location.search)
        : new URLSearchParams();

    Object.entries(query).forEach(([key, value]: [key: any, value: any]) => {
        newQuery.set(key, value);
    });

    Object.entries(pushToQuery).forEach(([key, value]: [key: any, value: any]) => {
        const currentValue = newQuery.get(key);
        const splittedValue: any = currentValue ? currentValue.split(",") : [];
        splittedValue.push(value);
        newQuery.set(key, splittedValue);
    });

    return {
        pathname: pathname.replace(/\/\//g, "/"),
        search: newQuery.toString() ? `?${newQuery.toString()}` : "",
        hash,
        state
    };
};
