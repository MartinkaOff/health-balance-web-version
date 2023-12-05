package com.academia.health.api;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface StepService {

    @POST("api/v2/steps")
    Call<StepResult> sendSteps(@Query("token") String token, @Body RequestBody requestBody);
}
