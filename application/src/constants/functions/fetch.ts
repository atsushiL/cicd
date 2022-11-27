import Cookies from "js-cookie";
import { FormValues } from "../../Types/FormTypes";

type GetProps = {
    url: string;
    resFunction?: (data: any) => void;
};

type LoginProps = {
    url: string;
    body: Partial<FormValues>;
    resFunction: (data: any) => void;
    loginRouting: (data: any) => void
}

type Props = {
    dirty?: object;
    url: string;
    body?: string
    resFunction?: (data: any) => void;
};

const baseUrl = 'http://localhost/back/api/';
const credentials = 'same-origin';


//resFunctionは返してきたresponseをどうやって処理するか
export const fetch_POST = ({ url, body, resFunction }: Props) => {
    const csrftoken = Cookies.get("csrftoken") || "";
    fetch(baseUrl + url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        body: body,
        credentials: credentials,
    })
        .then(resFunction)
        .catch((error) => {
            console.log(error);
        });
};

//resFunctionは返してきたdataをどうやって処理するか
export const fetch_POST_DATA = ({ url, body, resFunction }: Props) => {
    const csrftoken = Cookies.get("csrftoken") || "";
    fetch(baseUrl + url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        body: body,
        credentials: credentials,
    })
        .then((res) => res.json())
        .then(resFunction)
        .catch((error) => {
            console.log(error);
        });
};

//resFunctionはgetしたdataをどうやって処理するか
export const fetch_GET = ({ url, resFunction }: GetProps) => {
    const csrftoken = Cookies.get("csrftoken") || "";
    fetch(baseUrl + url, {
        method: "GET",
        headers: {
            "X-CSRFToken": csrftoken,
        },
        credentials: credentials,
    })
        .then((response) => response.json())
        .then(resFunction)
        .catch((error) => {
            console.log(error);
        });
};

export const fetch_PATCH = ({ dirty, url, body, resFunction }: Props) => {
    const csrftoken = Cookies.get("csrftoken") || "";
    const values = JSON.parse(body!);
    
    for (const [key, value] of Object.entries(values)) {
        //もし鍵は入っていない場合、バリューは変更してないし、PATCHの場合いらないから消す
        if (!(key in dirty!)) {
            delete values[`${key}`]
        }
    }
    //もし編集していません場合はfetchしません
    if (Object.keys(values).length === 0) {
        return;
    }
    fetch(baseUrl + url, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify(values),
        credentials: credentials,
    })
        .then(resFunction)
        .catch((error) => {
            console.log(error);
        });
};

export const fetch_LOGIN = ({ url, body, resFunction, loginRouting }: LoginProps) => {
    const csrftoken = Cookies.get("csrftoken") || "";

    fetch(baseUrl + url, {
        method: "POST",
        credentials: credentials,
        headers: {
            "Content-type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify(body),

    }).then(resFunction)
        .then(loginRouting)
        .catch((error) => {
            throw new Error('Something wrong');
        });
};

