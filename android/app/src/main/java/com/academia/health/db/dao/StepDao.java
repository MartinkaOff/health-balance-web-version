package com.academia.health.db.dao;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;
import androidx.room.Transaction;

import com.academia.health.db.entity.Step;

import java.util.List;

@Dao
public interface StepDao {
    @Transaction
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    Long saveStep(Step step);

    @Query("UPDATE step SET steps = :steps WHERE date = :date")
    int updateSteps(int steps, String date);


    @Transaction
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void saveSteps(List<Step> steps);

//    @Transaction
//    @Query("SELECT * FROM step WHERE id = :stepId")
//    LiveData<Step> getStep(int stepId);


    @Transaction
    @Query("SELECT * from step")
    List<Step> getSteps();

    //delete
    @Transaction
    @Query("DELETE FROM step")
    void deleteSteps();
}