package com.academia.health.utils;

import android.content.Context;
import android.content.SharedPreferences;

import com.academia.health.PedometerPluginImpl;
import com.getcapacitor.JSObject;

import org.json.JSONException;

import java.text.ParseException;
import java.util.Date;
import java.util.Objects;

public class SharedPrefManager {
    private static final String STE_KEY = "last_step_data_key";
    //    private static final String STE_COUNT_KEY = "last_step_count_data_key";
    private static final String BATTERY_OPTIMIZATION_DISABLED = "battery_opt_disabled";
    private static final String TOKEN = "steps_token"; // Caution: easy to get access to this token
    private static final String LOGGED_IN = "is_logged_in";

    private final Context context;

    public SharedPrefManager(Context context) {
        this.context = context;
    }

    public void clearStepsData() {
        SharedPreferences settings = context.getSharedPreferences("prefs", 0);
        settings.edit().remove(STE_KEY).apply();
        settings.edit().remove(BATTERY_OPTIMIZATION_DISABLED).apply();
    }

    public boolean isNotSameDay() {
        try {
            Date savedDate = DateHelper.dateFormat.parse(getLastDate());
            if (!DateHelper.isSameDay(savedDate)) {
                return true;
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return false;
    }

    public int getLastNumberOfSteps() {
        String stringData = getData();
        int steps = 0;
        try {
            Date savedDate = DateHelper.dateFormat.parse(getLastDate());
            if (!DateHelper.isSameDay(savedDate)) {
                clearStepsData();
                return 0;
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }

        try {
            JSObject jsObject = new JSObject(stringData);
            steps = jsObject.getInt("numberOfSteps");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return steps;
    }

    public String getLastDate() {
        String stringData = getData();
        String resultString = DateHelper.dateFormat.format(new Date());
        try {
            JSObject jsObject = new JSObject(stringData);
            resultString = jsObject.getString("currentDate");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        //TODO: sometimes "currentDate" doesn't come in shared preferences, need to investigate later
        return Objects.requireNonNullElseGet(resultString, () -> DateHelper.dateFormat.format(new Date()));

    }

    public void setToken(String token) {
        SharedPreferences settings = context.getSharedPreferences("prefs", 0);
        SharedPreferences.Editor editor = settings.edit();
        editor.putString(TOKEN, token);
        editor.apply();
    }

    public String getToken() {
        SharedPreferences settings = context.getSharedPreferences("prefs", 0);
        return settings.getString(TOKEN, "defaultData");
    }

    public void save(String data) {
        SharedPreferences settings = context.getSharedPreferences("prefs", 0);
        SharedPreferences.Editor editor = settings.edit();
        editor.putString(STE_KEY, data);
        editor.apply();
    }

    public String getData() {
        SharedPreferences settings = context.getSharedPreferences("prefs", 0);
        String defaultData = String.valueOf(PedometerPluginImpl.getStepsJSON(0));
        return settings.getString(STE_KEY, defaultData);
    }

    public void setBatteryOptimizationDisabled(boolean value) {
        SharedPreferences settings = context.getSharedPreferences("prefs", 0);
        SharedPreferences.Editor editor = settings.edit();
        editor.putBoolean(BATTERY_OPTIMIZATION_DISABLED, value);
        editor.apply();
    }

    public boolean isBatteryOptDisAsked() {
        SharedPreferences settings = context.getSharedPreferences("prefs", 0);
        return settings.getBoolean(BATTERY_OPTIMIZATION_DISABLED, false);
    }

    public void setLoggedIn(boolean value) {
        SharedPreferences settings = context.getSharedPreferences("prefs", 0);
        SharedPreferences.Editor editor = settings.edit();
        editor.putBoolean(LOGGED_IN, value);
        editor.apply();
    }

    public boolean isLoggedIn() {
        SharedPreferences settings = context.getSharedPreferences("prefs", 0);
        return settings.getBoolean(BATTERY_OPTIMIZATION_DISABLED, false);
    }
}
