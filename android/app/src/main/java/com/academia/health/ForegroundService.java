package com.academia.health;

import static com.academia.health.PedometerPluginImpl.INTENT_KEY;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Build;
import android.os.IBinder;
import android.os.PowerManager;
import android.util.Log;

import androidx.annotation.Nullable;

import androidx.core.content.ContextCompat;

import com.academia.health.api.StepPublisher;
import com.academia.health.db.dao.StepDao;
import com.academia.health.db.entity.Step;
import com.academia.health.utils.DateHelper;
import com.academia.health.utils.DayChangedBroadcastReceiver;
import com.academia.health.utils.PedometerWorker;
import com.academia.health.utils.SharedPrefManager;
import com.academia.health.workers.RestartBroadcastReceiver;

import org.json.JSONException;

import java.util.Date;

public class ForegroundService extends Service {
    private static final String CHANNEL_ID = "com.pedometer.weedoweb";
    private static final int FOREGROUND_ID = 945;

    private static NotificationManager notificationManager;

    PedometerPluginImpl plugin;
    private final DayChangedBroadcastReceiver m_timeChangedReceiver =
            new DayChangedBroadcastReceiver() {
                @Override
                public void onDayChanged() {
                    if (plugin == null) { return; }
                    plugin.reset();
                }
            };
    private final String TAG = ForegroundService.class.toString();

    private static Boolean isServiceRunning = false;

    private SharedPrefManager sharedPrefManager;
    private StepDao stepDao;

    @Override
    public void onCreate() {
        super.onCreate();
    }

    public void initializePedometer() {
        isServiceRunning = true;

        stepDao = App.get().getStepDao();

        notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        sharedPrefManager = new SharedPrefManager(this);

        plugin = PedometerPluginImpl.getInstance();
        plugin.initialize(this);
        plugin.start();

        plugin.listenerForService = data -> {
            if (sharedPrefManager.isNotSameDay()) {
                plugin.reset();
                return;
            }

            int steps = 0;
            try {
                steps = data.getInt(INTENT_KEY);
            } catch (JSONException e) {
                e.printStackTrace();
            }

            sharedPrefManager.save(String.valueOf(data));
            updateContent(this, String.valueOf(steps));

            String currentDate2 = DateHelper.normalDateFormat.format(new Date());

            if (stepDao != null) {
                int finalSteps = steps;
                AsyncTask.execute(() -> {
                    Step stepObj = new Step(currentDate2, finalSteps);
                    stepDao.saveStep(stepObj);
                    Log.d(TAG, String.valueOf(stepObj));
                });

            }
        };

        registerReceiver(m_timeChangedReceiver, DayChangedBroadcastReceiver.getIntentFilter());
    }

    public static void startService(Context context, String message) {
        if (context == null) {
            return;
        }

        if (isServiceRunning) {
            updateContent(context, message);
            return;
        }

        Intent intent = new Intent(context, ForegroundService.class);
        intent.putExtra(INTENT_KEY, message);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            ContextCompat.startForegroundService(context, intent);
        } else {
            context.startService(intent);
        }
    }

    public static void stopService(Context context) {
        Intent intent = new Intent(context, ForegroundService.class);
        context.stopService(intent);
        isServiceRunning = false;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        initializePedometer();

        String input = String.valueOf(sharedPrefManager.getLastNumberOfSteps());
        if (intent != null) {
            input = intent.getStringExtra(INTENT_KEY);
        }

        createNotificationChannel();

        Intent notificationIntent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this,
                0, notificationIntent, PendingIntent.FLAG_IMMUTABLE);

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            Notification.Builder notificationBuilder = new Notification.Builder(this, CHANNEL_ID)
                    .setContentTitle("Пройдено шагов сегодня:")
                    .setContentText(input)
                    .setSmallIcon(R.drawable.ic_baseline_directions_walk_24)
                    .setContentIntent(pendingIntent);

            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.S) {
                notificationBuilder.setForegroundServiceBehavior(Notification.FOREGROUND_SERVICE_IMMEDIATE);
            }

            startForeground(FOREGROUND_ID, notificationBuilder.build());
        }
        // do heavy work on a background thread
        // stopSelf();
        return START_STICKY;
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "Пройдено шагов сегодня: ", NotificationManager.IMPORTANCE_DEFAULT);
            channel.enableVibration(false);
            channel.setSound(null, null);
            channel.setShowBadge(false);
            notificationManager.createNotificationChannel(channel);
        }
    }

    private static void updateContent(Context context, String message) {
        PendingIntent pendingIntent = PendingIntent.getActivity(context,
                0, new Intent(context, MainActivity.class),
                PendingIntent.FLAG_IMMUTABLE);

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            Notification.Builder notificationBuilder = new Notification.Builder(context, CHANNEL_ID)
                    .setContentTitle("Пройдено шагов сегодня: ")
                    .setContentText(message)
                    .setSmallIcon(R.drawable.ic_baseline_directions_walk_24)
                    .setContentIntent(pendingIntent);

            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.S) {
                notificationBuilder.setForegroundServiceBehavior(Notification.FOREGROUND_SERVICE_IMMEDIATE);
            }

            notificationManager.notify(FOREGROUND_ID, notificationBuilder.build());
        }
    }

    @Override
    public void onDestroy() {
        isServiceRunning = false;

        super.onDestroy();
        Log.i(TAG, "onDestroy: Service is destroyed :( ");
        Intent broadcastIntent = new Intent(this, RestartBroadcastReceiver.class);
        sendBroadcast(broadcastIntent);
        unregisterReceiver(m_timeChangedReceiver);
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
