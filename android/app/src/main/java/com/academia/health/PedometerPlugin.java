package com.academia.health;

import static com.academia.health.PedometerPluginImpl.INTENT_KEY;

import android.Manifest;
import android.content.ComponentName;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.util.Log;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AlertDialog;
import androidx.core.content.ContextCompat;
import androidx.work.ExistingPeriodicWorkPolicy;
import androidx.work.PeriodicWorkRequest;
import androidx.work.WorkManager;

import com.academia.health.utils.DateHelper;
import com.academia.health.utils.PedometerWorker;
import com.academia.health.utils.SharedPrefManager;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;

import org.json.JSONException;

import java.text.ParseException;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@CapacitorPlugin(
        name = "Pedometer",
        permissions = {
                @Permission(strings = { Manifest.permission.ACTIVITY_RECOGNITION }),
                @Permission(strings = { Manifest.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS })
        }
)
public class PedometerPlugin extends Plugin {
    private PedometerPluginImpl plugin;
    private ActivityResultLauncher<String> requestPermissionLauncher;

    private Boolean isDialogPresent = false;
    private Boolean isStartInvoked = false;
    private SharedPrefManager sharedPrefManager;
    private static final String TAG = PedometerPlugin.class.getName();

    private static final Intent[] POWERMANAGER_INTENTS = {
            new Intent().setComponent(new ComponentName("com.miui.securitycenter", "com.miui.permcenter.autostart.AutoStartManagementActivity")),
            new Intent().setComponent(new ComponentName("com.letv.android.letvsafe", "com.letv.android.letvsafe.AutobootManageActivity")),
            new Intent().setComponent(new ComponentName("com.huawei.systemmanager", "com.huawei.systemmanager.startupmgr.ui.StartupNormalAppListActivity")),
            new Intent().setComponent(new ComponentName("com.huawei.systemmanager", "com.huawei.systemmanager.optimize.process.ProtectActivity")),
            new Intent().setComponent(new ComponentName("com.huawei.systemmanager", "com.huawei.systemmanager.appcontrol.activity.StartupAppControlActivity")),
            new Intent().setComponent(new ComponentName("com.coloros.safecenter", "com.coloros.safecenter.permission.startup.StartupAppListActivity")),
            new Intent().setComponent(new ComponentName("com.coloros.safecenter", "com.coloros.safecenter.startupapp.StartupAppListActivity")),
            new Intent().setComponent(new ComponentName("com.oppo.safe", "com.oppo.safe.permission.startup.StartupAppListActivity")),
            new Intent().setComponent(new ComponentName("com.iqoo.secure", "com.iqoo.secure.ui.phoneoptimize.AddWhiteListActivity")),
            new Intent().setComponent(new ComponentName("com.iqoo.secure", "com.iqoo.secure.ui.phoneoptimize.BgStartUpManager")),
            new Intent().setComponent(new ComponentName("com.vivo.permissionmanager", "com.vivo.permissionmanager.activity.BgStartUpManagerActivity")),
            new Intent().setComponent(new ComponentName("com.samsung.android.lool", "com.samsung.android.sm.battery.ui.BatteryActivity")),
            new Intent().setComponent(new ComponentName("com.samsung.android.lool", "com.samsung.android.sm.ui.battery.BatteryActivity")),
            new Intent().setComponent(new ComponentName("com.htc.pitroad", "com.htc.pitroad.landingpage.activity.LandingPageActivity")),
            new Intent().setComponent(new ComponentName("com.asus.mobilemanager", "com.asus.mobilemanager.MainActivity")),
            new Intent().setComponent(new ComponentName("com.transsion.phonemanager", "com.itel.autobootmanager.activity.AutoBootMgrActivity"))
    };

    @Override
    public void load() {
        super.load();

        sharedPrefManager = new SharedPrefManager(getContext());

        requestPermissionLauncher =
                getActivity().registerForActivityResult(new ActivityResultContracts
                        .RequestPermission(), isGranted -> {
                    if (isGranted && sharedPrefManager.isLoggedIn()) {
                        startExecution();
                    } else {
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                            askPermission();
                        }
                    }
                });

        plugin = PedometerPluginImpl.getInstance();
        plugin.initialize(getContext());
        plugin.listener = data -> {
            bridge.triggerJSEvent("stepEvent", "window", String.valueOf(data));

            if (sharedPrefManager.isNotSameDay()) {
                plugin.reset();
            }
        };

        isDialogPresent = false;
        isStartInvoked = false;
    }

    @Override
    protected void handleOnStart() {
        super.handleOnStart();
        if (isStartInvoked) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                askPermission();
            }
        }
    }

    @Override
    protected void handleOnDestroy() {
        super.handleOnDestroy();
    }

    @PluginMethod
    public void getSavedData(PluginCall call) {
        String savedData = sharedPrefManager.getData();
        boolean incompatible = false;
        try {
            Date savedDate = DateHelper.dateFormat.parse(sharedPrefManager.getLastDate());
            incompatible = !DateHelper.isSameDay(savedDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        if (savedData == null || incompatible) {
            plugin.reset();
            JSObject data = PedometerPluginImpl.getStepsJSON(0);
            call.resolve(data);
            return;
        }
        try {
            call.resolve(new JSObject(savedData));
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @PluginMethod
    public void setData(PluginCall call) {
        if (!sharedPrefManager.isLoggedIn()) {
            return;
        }
        int stepsFromIonic = call.getInt(INTENT_KEY, 0);

        sharedPrefManager.save(String.valueOf(PedometerPluginImpl.getStepsJSON(stepsFromIonic)));
        plugin.lastNumberOfSteps = stepsFromIonic;
        start(call);
        call.resolve();
    }

    @PluginMethod
    public void start(PluginCall call) {
        sharedPrefManager.setToken(call.getString("token"));
        sharedPrefManager.setLoggedIn(true);
        isStartInvoked = true;
        askBatteryOptPermission();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            askPermission();
        }
    }

    @PluginMethod
    public void stop(PluginCall call) {
        sharedPrefManager.setLoggedIn(false);
        plugin.stop();
        ForegroundService.stopService(getContext());
        call.resolve();
    }

    @PluginMethod
    public void reset(PluginCall call) {
        plugin.reset();
        call.resolve();
    }

    @PluginMethod
    public void requestPermission(PluginCall call) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            askPermission();
        }
        call.resolve();
    }

    public void startServiceViaWorker() {
        String UNIQUE_WORK_NAME = "PedometerWeedoweb";
        WorkManager workManager = WorkManager.getInstance(getContext());

        // As per Documentation: The minimum repeat interval that can be defined is 15 minutes
        // (same as the JobScheduler API), but in practice 15 doesn't work. Using 16 here
        PeriodicWorkRequest request =
                new PeriodicWorkRequest.Builder(
                        PedometerWorker.class,
                        16,
                        TimeUnit.MINUTES)
                        .build();

        // to schedule a unique work, no matter how many times app is opened i.e. startServiceViaWorker gets called
        // do check for AutoStart permission
        workManager.enqueueUniquePeriodicWork(UNIQUE_WORK_NAME, ExistingPeriodicWorkPolicy.KEEP, request);

    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    private void askPermission() {
        if (!sharedPrefManager.isLoggedIn()) {
            return;
        }
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) {
            startExecution();
            return;
        }
        if (ContextCompat.checkSelfPermission(getActivity(),
                android.Manifest.permission.ACTIVITY_RECOGNITION) ==
                PackageManager.PERMISSION_GRANTED) {
            startExecution();
        } else if (getActivity().shouldShowRequestPermissionRationale(android.Manifest.permission.ACTIVITY_RECOGNITION)) {
            showContextDialog();
        } else {
            requestPermissionLauncher.launch(android.Manifest.permission.ACTIVITY_RECOGNITION);
        }
    }

    private void showContextDialog() {
        if (isDialogPresent) return;
        AlertDialog.Builder builder = new AlertDialog.Builder(getContext());
        builder.setCancelable(false);
        builder.setTitle("Необходимо разрешение");
        builder.setMessage("Вы должны разрешить физическую активность для использования этого приложения");
        builder.setPositiveButton("Настройки", (dialog, which) -> {
            requestPermissionLauncher.launch(android.Manifest.permission.ACTIVITY_RECOGNITION);
            isDialogPresent = false;
        });
        builder.create().show();
        isDialogPresent = true;
    }

    private void startExecution() {
        startServiceViaWorker();
        SharedPrefManager sharedPrefManager = new SharedPrefManager(getContext());
        String lastSavedSteps = String.valueOf(sharedPrefManager.getLastNumberOfSteps());
        ForegroundService.startService(getContext(), lastSavedSteps);

        plugin.start();
    }

    private void askBatteryOptPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !sharedPrefManager.isBatteryOptDisAsked()) {
            getContext().startActivity(new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS,
                    Uri.parse("package:" +getContext().getPackageName())));
            sharedPrefManager.setBatteryOptimizationDisabled(true);
        }
    }

    private boolean isHuaweiDevice(){
        String manufacturer = android.os.Build.MANUFACTURER;
        String brand =  android.os.Build.BRAND;
        return  manufacturer.toLowerCase().contains("huawei") ||  brand.toLowerCase().contains("huawei");
    }
}
