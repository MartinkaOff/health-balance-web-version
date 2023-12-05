package com.academia.health;


import android.app.Application;

import com.academia.health.api.StepPublisher;
import com.academia.health.api.StepService;
import com.academia.health.db.StepDatabase;
import com.academia.health.db.dao.StepDao;
import com.academia.health.utils.AppExecutors;
import com.academia.health.utils.SharedPrefManager;
import com.academia.health.workers.RestartBroadcastReceiver;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class App extends Application {
    private static final String TAG = App.class.getSimpleName();

    private StepService mStepService;

    private static App INSTANCE;

    private static AppExecutors mAppExecutors;

    private static StepDao mStepDao;

    private StepPublisher publisher;
    private SharedPrefManager sharedPrefManager;

    public static App get() {
        return INSTANCE;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        INSTANCE = this;
        publisher = new StepPublisher(this);


        //BookService
        mStepService = publisher.stepService;
        mAppExecutors = new AppExecutors();
        mStepDao = StepDatabase.getDatabase(getApplicationContext()).stepDao();
        sharedPrefManager = new SharedPrefManager(this);

        RestartBroadcastReceiver.scheduleJob(getApplicationContext());
    }

    public StepService getStepService() {
        return mStepService;
    }


    public StepDao getStepDao() {
        return mStepDao;
    }

    public StepPublisher getPublisher() {
        return publisher;
    }

    public SharedPrefManager getSharedPrefManager() {
        return sharedPrefManager;
    }

    public AppExecutors getExecutors() {
        return mAppExecutors;
    }

}
