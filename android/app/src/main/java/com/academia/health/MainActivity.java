package com.academia.health;

import static com.academia.health.utils.Constants.SYNC_DATA_WORK_NAME;
import static com.academia.health.utils.Constants.TAG_SYNC_DATA;

import android.os.Bundle;

import androidx.work.BackoffPolicy;
import androidx.work.Constraints;
import androidx.work.ExistingPeriodicWorkPolicy;
import androidx.work.NetworkType;
import androidx.work.PeriodicWorkRequest;
import androidx.work.WorkManager;

import com.academia.health.workers.SyncDataWorker;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import com.getcapacitor.BridgeActivity;

import java.util.concurrent.TimeUnit;


public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(GoogleAuth.class);
        registerPlugin(PedometerPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
