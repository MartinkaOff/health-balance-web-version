import {AxiosResponse} from "axios";
import {$api} from "../http";
import {IBalance, IStepsPerDay} from "../models/IApp";

export default class AppService {
  static getBalance(): Promise<AxiosResponse<{ data: IBalance }>> {
    return $api.get(`balance?token=${localStorage.getItem("token")}`);
  }

  static updateSteps(params: FormData) {
    return $api.post(
      `steps?token=${localStorage.getItem("token")}`,
      params,
      {
        headers: {
          accept: "application/json",
          "Content-Type": `multipart/form-data`,
        },
      }
    );
  }

  static getStepsPerDay(): Promise<AxiosResponse<{ data: {statistic:IStepsPerDay[],difference:number} }>> {
    return $api.get(`steps?token=${localStorage.getItem("token")}`);
  }

  static getStepsPerWeekAndMonth(start_date:string, end_date:string, type:1|2){
    return $api.get(`steps?end_date=${end_date}&start_date=${start_date}&type=${type}&token=${localStorage.getItem("token")}`);
  }
}
