package com.academia.health.api;

import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;

import com.academia.health.App;
import com.academia.health.db.StepDatabase;
import com.academia.health.db.dao.StepDao;
import com.academia.health.db.entity.Step;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.List;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class StepPublisher implements Callback<StepResult> {

    static final String BASE_URL = "https://health-balance.ru/";
    private final Gson gson;
    private final Retrofit retrofit;
    public final StepService stepService;
    private static final String TAG = StepPublisher.class.toString();
    private StepDao stepDao;

    public StepPublisher(Context context) {
        gson = new GsonBuilder()
                .setLenient().create();
        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();
        stepService = retrofit.create(StepService.class);
        stepDao = StepDatabase.getDatabase(context).stepDao();
    }

    public void send(String token, List<Step> steps) {
        if (steps.isEmpty()) {
            return;
        }
//        String dataPart = "[{\"date\":\"" + date + "\", \"steps\":" + steps + "}]";
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String jsonSteps = gson.toJson(steps);
        RequestBody requestBody = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("data", jsonSteps)
                .build();

        Call<StepResult> call = stepService.sendSteps(token, requestBody);
        call.enqueue(this);
        Log.e(TAG, "request: " + jsonSteps);
    }

    @Override
    public void onResponse(Call<StepResult> call, Response<StepResult> response) {
        Log.e(TAG, "response: " + response.toString());
        if (response.isSuccessful()) {
            if (stepDao != null) {

                AsyncTask.execute(() -> {
                    stepDao.deleteSteps();
                });

            }
        }
    }

    @Override
    public void onFailure(Call<StepResult> call, Throwable t) {
        Log.e(TAG, "error: " + t.toString());
    }
}
