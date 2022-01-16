import { useEffect, useState } from "react";
import axios from "axios";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

const restUrl = "api/speakers";

const useRequestRest = () => {
  const [data, setData] = useState([]);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, setError] = useState("");

  // GET
  useEffect(async () => {
    try {
      const response = await axios.get(restUrl);
      setRequestStatus(REQUEST_STATUS.SUCCESS);
      setData(response.data);
    } catch (e) {
      setRequestStatus(REQUEST_STATUS.FAILURE);
      setError(e);
    }
  }, []);

  //PUT
  const updateRecord = (record, doneCallback) => {
    const originalRecords = [...data];

    const newRecords = data.map((rec) => {
      return rec.id === record.id ? record : rec;
    });

    async function delayFunction() {
      try {
        setData(newRecords);
        await axios.put(`${restUrl}/${record.id}`, record);
        if (doneCallback) doneCallback();
      } catch (error) {
        console.log("Error thrown inside update function", error);
        if (doneCallback) doneCallback();
        setData(originalRecords);
      }
    }

    delayFunction();
  };

  //POST
  const insertRecord = (record, doneCallback) => {
    const originalRecords = [...data];
    const newRecords = [record, ...data];

    async function delayFunction() {
      try {
        setData(newRecords);
        await axios.post(`${restUrl}/0`, record);
        if (doneCallback) doneCallback();
      } catch (error) {
        console.log("Error thrown inside delay function", error);
        if (doneCallback) doneCallback();
        setData(originalRecords);
      }
    }

    delayFunction();
  };

  //DELETE
  const deleteRecord = (record, doneCallback) => {
    const originalRecords = [...data];
    const newRecords = data.filter((rec) => rec.id !== record.id);

    async function delayFunction() {
      try {
        setData(newRecords);
        await axios.delete(`${restUrl}/${record.id}`, record);
        if (doneCallback) doneCallback();
      } catch (error) {
        console.log("Error thrown inside delete function", error);
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

export default useRequestRest;
