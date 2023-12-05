import {Capacitor} from "@capacitor/core";
import OneSignal from "onesignal-cordova-plugin";
import {OpenedEvent} from "onesignal-cordova-plugin/dist/models/NotificationOpened";

export const useOneSignal = () => {
    const oneSignalInit = () => {
        if (Capacitor.getPlatform() !== 'web') {
            let externalUserId = localStorage.getItem('id')

            OneSignal.setExternalUserId(externalUserId, (results: any) => {
                // The results will contain push and email success statuses
                console.log('External user id ', JSON.stringify(results))
                if (results.push && results.push.success) {
                    console.log('Results external user id: ', results.push.success)
                }
            })
        }
    }
    const handlerClickPush = (callback:(openedEvent:OpenedEvent)=>void) => {
        if (Capacitor.getPlatform() !== 'web') {
            OneSignal.setAppId('6c585b11-b33a-44f5-8c7b-3ffac2059d19')
            OneSignal.setNotificationOpenedHandler(callback)
            OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
                console.log('User accepted notifications: ' + accepted)
            })
        }
    }
    return {oneSignalInit,handlerClickPush}
}