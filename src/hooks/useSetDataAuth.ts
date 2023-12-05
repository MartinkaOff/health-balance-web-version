import {resetFieldRegistration, setAuth} from "../Redux/slice/authSlice";
import {ACTIVITY_ROUTE} from "../provider/constants-route";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "./redux-hooks";
import {useOneSignal} from "./useOneSignal";
import {IAuthResponse} from "../models/IAuth";
import {useCreatingPersonalPurposeMutation} from "../services/purpose.api";
import {Capacitor} from "@capacitor/core";
import Pedometer from "../plugins/pedometer";


export const useSetDataAuth = () => {
    let navigate = useNavigate()
    const {oneSignalInit} = useOneSignal()
    const dispatch = useAppDispatch()
    const [createPurpose] = useCreatingPersonalPurposeMutation()

    const setDataAuth = async (response:IAuthResponse) => {

        localStorage.setItem('token', response.data.token)
        localStorage.setItem('id', response.data.id.toString())
        await createPurpose({type:1,quantity:10000}).unwrap()
        dispatch(setAuth())
        dispatch(resetFieldRegistration())
        oneSignalInit()
        navigate(ACTIVITY_ROUTE)

        // if (Capacitor.getPlatform() === 'android') {
        //     Pedometer.start({ token: response.data.token })
        // }


    }

    return {setDataAuth}
}