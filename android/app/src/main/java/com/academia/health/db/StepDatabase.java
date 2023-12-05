package com.academia.health.db;

import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;

import com.academia.health.db.dao.StepDao;
import com.academia.health.db.entity.Step;

@Database(entities = {Step.class}, version = 1, exportSchema = false)
public abstract class StepDatabase extends RoomDatabase {
    private static volatile StepDatabase INSTANCE;

    public abstract StepDao stepDao();

    public static StepDatabase getDatabase(final Context context) {
        if (INSTANCE == null) {
            synchronized (StepDatabase.class) {
                if (INSTANCE == null) {
                    // Create database here
                    INSTANCE = Room.databaseBuilder(context.getApplicationContext(),
                                    StepDatabase.class, "step_database")
                            .build();
                }
            }
        }
        return INSTANCE;
    }
}