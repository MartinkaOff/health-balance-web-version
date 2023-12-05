package com.academia.health.db.entity;


import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.Ignore;
import androidx.room.PrimaryKey;

import com.academia.health.utils.DateHelper;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.Date;

@Entity(tableName = "step")
public class Step {

    /**
     * No args constructor for use in serialization
     */
    public Step() {
        date = DateHelper.normalDateFormat.format(new Date());
    }

    /**
     * @param date
     * @param steps
     */
    @Ignore
    public Step(String date, int steps) {
        super();
        this.date = date;
        this.steps = steps;
    }

//    @PrimaryKey(autoGenerate = true)
//    @Expose(serialize = false)
//    private Integer id;

    @NonNull
    @PrimaryKey()
    @SerializedName("date")
    @Expose
    private String date;

    @SerializedName("steps")
    @Expose
    private int steps;

//    public Integer getId() {
//        return id;
//    }
//
//    public void setId(Integer id) {
//        this.id = id;
//    }

    public void setDate(@NonNull String date) {
        this.date = date;
    }

    @NonNull
    public String getDate() {
        return date;
    }

    public void setSteps(int steps) {
        this.steps = steps;
    }

    public int getSteps() {
        return steps;
    }

    @Override
    public String toString() {
        return "[{\"date\":\"" + date + "\", \"steps\":" + steps + "}]";
    }
}
