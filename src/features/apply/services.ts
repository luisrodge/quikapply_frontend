import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalize } from "normalizr";

import api from "../../utils/api";
import {
  IApplication,
  IApplicationWithChildren,
  IColumn,
  IErrorMessage,
  IInput,
  IRow,
  ISection,
} from "../applications/applications.interface";
import { ApplicationSchema } from "../applications/schemas";
import { ICreateSubmissionAttributes } from "./apply.interface";

export const GetApplication = createAsyncThunk(
  "applications/get",
  async (id: string) => {
    const { data } = await api.get(`applications/${id}`);

    const { entities } = normalize(data, ApplicationSchema);

    const {
      applications,
      sections: normedSections,
      rows: normedRows,
      columns: normedColumns,
      inputs: normedInputs,
    } = entities;

    const application = applications![id];
    const sections =
      normedSections == undefined
        ? []
        : Object.keys(normedSections).map((id) => normedSections[id]);
    const rows =
      normedRows == undefined
        ? []
        : Object.keys(normedRows).map((id) => normedRows[id]);
    const columns =
      normedColumns == undefined
        ? []
        : Object.keys(normedColumns).map((id) => normedColumns[id]);
    const inputs =
      normedInputs == undefined
        ? []
        : Object.keys(normedInputs).map((id) => normedInputs[id]);

    const applicationData = {
      application: application as IApplication,
      sections: sections as ISection[],
      rows: rows as IRow[],
      columns: columns as IColumn[],
      inputs: inputs as IInput[],
    };

    return applicationData as IApplicationWithChildren;
  }
);

export const CreateSubmission = createAsyncThunk<
  IApplication,
  ICreateSubmissionAttributes,
  {
    rejectValue: IErrorMessage;
  }
>("submissions/create", async (submissionData, thunkApi) => {
  const response = await api.post("submissions", submissionData);
  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to submit application.",
    } as IErrorMessage);
  }
  return {} as IApplication;
});