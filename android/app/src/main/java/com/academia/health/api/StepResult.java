package com.academia.health.api;

import com.google.gson.annotations.SerializedName;

public class StepResult {
    @SerializedName("success")
    public int success;

    public int getSucces() {
        return success;
    }

    public void setSuccess(int success) {
        this.success = success;
    }
}
