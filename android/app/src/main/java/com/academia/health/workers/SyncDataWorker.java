package com.academia.health.workers;


import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

import com.academia.health.App;
import com.academia.health.R;
import com.academia.health.api.StepPublisher;
import com.academia.health.api.StepService;
import com.academia.health.db.dao.StepDao;
import com.academia.health.db.entity.Step;
import com.academia.health.utils.DateHelper;
import com.academia.health.utils.SharedPrefManager;

import java.util.Date;
import java.util.List;

import retrofit2.Call;
import retrofit2.Response;

public class SyncDataWorker extends Worker {
    private StepService stepService;
    private StepDao stepDao;

    private StepPublisher stepPublisher;
    private SharedPrefManager sharedPrefManager;

    private static final String TAG = SyncDataWorker.class.getSimpleName();

    public SyncDataWorker(@NonNull Context appContext, @NonNull WorkerParameters workerParams) {
        super(appContext, workerParams);
        stepService = App.get().getStepService();
        stepDao = App.get().getStepDao();
        stepPublisher = App.get().getPublisher();
        sharedPrefManager = App.get().getSharedPrefManager();

    }

    @NonNull
    @Override
    public Result doWork() {

        Context applicationContext = getApplicationContext();
        //simulate slow work
        // WorkerUtils.makeStatusNotification("Fetching Data", applicationContext);
        Log.i(TAG, "Fetching Data from Remote host");
        WorkerUtils.sleep();

        try {
            String token = sharedPrefManager.getToken();
//            String currentDate = DateHelper.normalDateFormat.format(new Date());
            List<Step> steps = stepDao.getSteps();
            stepPublisher.send(token, steps);

//            if (response.isSuccessful() && response.body() != null && !response.body().isEmpty() && response.body().size() > 0) {
//
                return Result.success();
//            } else {
//                return Result.retry();
//            }


        } catch (Throwable e) {
            e.printStackTrace();
            // Technically WorkManager will return Result.failure()
            // but it's best to be explicit about it.
            // Thus if there were errors, we're return FAILURE
            Log.e(TAG, "Error fetching data", e);
            return Result.failure();
        }
    }


    @Override
    public void onStopped() {
        super.onStopped();
        Log.i(TAG, "OnStopped called for this worker");
    }
}
