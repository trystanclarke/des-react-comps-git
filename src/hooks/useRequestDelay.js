import { useEffect, useState } from "react";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

const useRequestDelay = (delayTime = 1000, initialData = []) => {
  const [data, setData] = useState(initialData);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, setError] = useState("");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(async () => {
    try {
      await delay(delayTime);
      //throw "shit!";
      setRequestStatus(REQUEST_STATUS.SUCCESS);
      setData(data);
    } catch (e) {
      setRequestStatus(REQUEST_STATUS.FAILURE);
      setError(e);
    }
  }, []);

  const updateRecord = (record, doneCallback) => {
    const originalRecords = [...data];

    const newRecords = data.map((rec) => {
      return rec.id === record.id ? record : rec;
    });

    async function delayFunction() {
      try {
        setData(newRecords);
        await delay(delayTime);
        if (doneCallback) doneCallback();
      } catch (error) {
        console.log("Error thrown inside delay function", error);
        if (doneCallback) doneCallback();
        setData(originalRecords);
      }
    }

    delayFunction();
  };

  const insertRecord = (record, doneCallback) => {
    const originalRecords = [...data];
    const newRecords = [record, ...data];

    async function delayFunction() {
      try {
        setData(newRecords);
        await delay(delayTime);
        if (doneCallback) doneCallback();
      } catch (error) {
        console.log("Error thrown inside delay function", error);
        if (doneCallback) doneCallback();
        setData(originalRecords);
      }
    }

    delayFunction();
  };

  const deleteRecord = (record, doneCallback) => {
    const originalRecords = [...data];
    const newRecords = data.filter((rec) => rec.id !== record.id);

    async function delayFunction() {
      try {
        setData(newRecords);
        await delay(delayTime);
        if (doneCallback) doneCallback();
      } catch (error) {
        console.log("Error thrown inside delay function", error);
        if (doneCallback) doneCallback();
        setData(originalRecords);
      }
    }

    delayFunction();
  };

  return {
    data,
    requestStatus,
    error,
    updateRecord,
    insertRecord,
    deleteRecord,
  };
};

export default useRequestDelay;
