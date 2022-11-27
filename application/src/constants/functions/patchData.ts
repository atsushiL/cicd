import Cookies from "js-cookie";
import { SetStateAction } from "react";
import { FormValues } from "../../Types/FormTypes";
import { fetch_PATCH } from "./fetch";

export const patchDataForApplyCustomer = (data: Partial<FormValues>, url: string, setReload: (value: SetStateAction<boolean>) => void) => {
    const csrftoken = Cookies.get("csrftoken") || "";
    const baseUrl = 'https://api.stg.crm.agsmileleaseback.co.jp/api/';
    const credentials = 'same-origin';
    const statusHandler = (text: string) => {
        switch (text) {
            case '未対応':
                return 0
            case '対応中':
                return 1

            case '社内承認':
                return 2

            case 'agree':
                return 3

            case 'renegotiation':
                return 4

            case '取り下げ':
                return 5

            default:
                break;
        }
    }
    console.log(data)
    const postData = {
        address: {
            prefecture: data.prefectures,
            municipalities: data.municipalities,
            house_no: data.houseNumber,
            post_no: data.postcode,
            other: data.buildingName,
        },
        customer_data: {
            name: data.name,
            kana: data.name_kana,
            birthday: data.birthday,
            // sex: 0,
            email: data.email,
            memo: data.memo,
            cellphone_no: data.phoneNumber,
            phone_no: data.homeNumber,
        },
        provisional_customer_data: {
            application_date: data.applyDate,
            status: statusHandler(data.status as string),
            property: data.applyType === 'personal' ? 0 : 1,
            approval: data.applyResult === 'approve' ? true : false,
            reason_for_refusal: data.reason_for_refusal,
        },
    };
    console.log(postData)
    // const values = JSON.parse(!);

    // for (const [key, value] of Object.entries(values)) {
    //     //もし鍵は入っていない場合、バリューは変更してないし、PATCHの場合いらないから消す
    //     if (!(key in dirty!)) {
    //         delete values[`${key}`]
    //     }
    // }
    // //もし編集していません場合はfetchしません
    // if (Object.keys(values).length === 0) {
    //     return;
    // }
    // fetch(baseUrl + url, {
    //     method: "PATCH",
    //     headers: {
    //         "Content-type": "application/json",
    //         "X-CSRFToken": csrftoken,
    //     },
    //     body: JSON.stringify(postData),
    //     credentials: credentials,
    // })
    //     .then(res => {
    //         if (!res.ok) {
    //             res.json().then((data) => {
    //                 alert(Object.values(data).map((item) => item));
    //             });
    //         }else{
    //             setReload(true)
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
}
